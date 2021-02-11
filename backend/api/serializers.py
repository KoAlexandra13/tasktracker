import requests
from django.core import files
from io import BytesIO
import imghdr

from django.db.models import Q
from django.conf import settings
from django.core.exceptions import ValidationError

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField, JSONField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.models import User, Table, TableColumn, Task


class CustomJWTSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        credentials = {
            'password': attrs.get("password")
        }

        # This is answering the original question, but do whatever you need here.
        # For example in my case I had to check a different model that stores more user info
        # But in the end, you should obtain the username to continue.
        email_or_username = attrs.get("username")
        user_obj = User.objects.filter(
            Q(email=email_or_username) | Q(username=email_or_username)
        ).first()
        credentials['username'] = user_obj.username if user_obj else None

        data = super().validate(credentials)
        data['user'] = UserDetailSerializer(user_obj).data

        return data


class UserDetailSerializer(ModelSerializer):
    fullname = serializers.CharField(max_length=180, allow_blank=True)

    class Meta:
        model = User
        fields = (
            'fullname', 'username', 'id',
            'email', 'organization', 'image', 'about', 'is_email_verified'
        )

    def update(self, instance, validated_data):
        fullname = validated_data.pop('fullname', None)
        if fullname is not None:
            instance.first_name, instance.last_name = fullname.split(" ", 1)
        return super().update(instance, validated_data)


class UserMiniSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'image']


class TaskMiniDetailSerializer(ModelSerializer):
    assigned_users = UserMiniSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'


class TaskDetailSerializer(ModelSerializer):
    assigned_users = UserMiniSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'


class TaskUpdateSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'name', 'description',
            'label', 'assigned_users',
            'deadline', 'index', 'column'
        )


class TableColumnDetailSerializer(ModelSerializer):
    tasks = TaskMiniDetailSerializer(many=True)

    class Meta:
        model = TableColumn
        fields = '__all__'


class TableColumnUpdateSerializer(ModelSerializer):
    class Meta:
        model = TableColumn
        fields = ('index', 'name', 'table', 'tasks')

    def update(self, instance, validated_data):
        tasks_to_set_ids = validated_data.pop('tasks', None)
        instance = super().update(instance, validated_data)
        current_tasks_ids = instance.tasks.order_by('index').values_list('id', flat=True)

        if (
            tasks_to_set_ids is not None and
            (
                new_task_ids_set := set(tasks_to_set_ids).difference(current_tasks_ids)
            )
        ):
            # New tasks added and (maybe) order changed
            tasks_to_set = tasks_to_set_ids and Task.objects.filter(id__in=tasks_to_set_ids).select_related('column')
            tasks_to_set__ids_to_objs = {
                task.id: task
                for task in tasks_to_set
            }
            related_columns = []
            for i, task_id in enumerate(tasks_to_set_ids):
                task = tasks_to_set__ids_to_objs[task_id]
                task.index = i
                if task_id in new_task_ids_set:
                    task.column = instance
                    related_columns.append(task.column)
            Task.objects.bulk_update(tasks_to_set, ['column', 'index'])

            for column in related_columns:
                # Normally, related_columns contains one column
                column.reindex_tasks()

        elif tasks_to_set_ids is not None and (current_tasks_ids != tasks_to_set_ids):
            # Order changed
            tasks_to_set = tasks_to_set_ids and instance.tasks.select_related('column')
            tasks_to_set__ids_to_objs = {
                task.id: task
                for task in tasks_to_set
            }
            for i, task_id in enumerate(tasks_to_set_ids):
                tasks_to_set__ids_to_objs[task_id].index = i
            Task.objects.bulk_update(tasks_to_set, ['column', 'index'])
        return instance


class TableDetailSerializer(ModelSerializer):
    columns = TableColumnDetailSerializer(many=True, read_only=True)
    users = UserDetailSerializer(many=True, read_only=True)
    image_from_url = serializers.URLField(required=False, write_only=True)

    class Meta:
        model = Table
        fields = '__all__'

    @staticmethod
    def _download_image_from_url_and_save_to_table(instance, url):
        url = url.replace(settings.FRONTEND_EXTERNAL_URL, settings.FRONTEND_INTERNAL_URL)
        img_content = requests.get(url).content

        filetype = imghdr.what(None, h=img_content)
        if filetype is None:
            # Couldn't determine, so probably not image
            raise ValidationError("Image of unidentified type")
        file_extension = "." + filetype

        fp = BytesIO()
        fp.write(img_content)

        file_name = url.split("/")[-1]
        # Cut filename to 100 chars
        if file_name.endswith(file_extension):
            file_name = file_name[max(len(file_name) - 100, 0):]
        else:
            file_name = file_name[max(len(file_name) - 100 - len(file_extension), 0):] + file_extension

        instance.background_image.save(file_name, files.File(fp))

    def create(self, validated_data):
        image_from_url = validated_data.pop('image_from_url', None)
        instance = super().create(validated_data)
        if image_from_url:
            self._download_image_from_url_and_save_to_table(instance, image_from_url)
        return instance

    def update(self, instance, validated_data):
        image_from_url = validated_data.pop('image_from_url', None)
        new_columns_ids = validated_data.pop('columns', None)

        instance = super().update(instance, validated_data)

        if (
            new_columns_ids is not None and
            new_columns_ids != list(instance.columns.order_by('index').values_list('id', flat=True))
        ):
            new_columns_qs = instance.columns.all()
            new_columns_qs_to_objects = {
                column.id: column for column in new_columns_qs
            }
            for index, column_id in enumerate(new_columns_ids):
                new_columns_qs_to_objects[column_id].index = index
            TableColumn.objects.bulk_update(new_columns_qs, ['index'])

        if image_from_url:
            self._download_image_from_url_and_save_to_table(instance, image_from_url)
        return instance
