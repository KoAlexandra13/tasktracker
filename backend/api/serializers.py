import requests
from django.core import files
from io import BytesIO

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


class TaskMiniSerializer(ModelSerializer):
    assigned_users = UserMiniSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'


class TaskDetailSerializer(ModelSerializer):
    assigned_users = UserMiniSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'


class TableColumnDetailSerializer(ModelSerializer):
    tasks = TaskMiniSerializer(many=True)

    class Meta:
        model = TableColumn
        fields = '__all__'


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

        fp = BytesIO()
        fp.write(
            requests.get(url).content
        )
        file_name = url.split("/")[-1]
        instance.background_image.save(file_name, files.File(fp))

    def create(self, validated_data):
        image_from_url = validated_data.pop('image_from_url', None)
        instance = super().create(validated_data)
        if image_from_url:
            self._download_image_from_url_and_save_to_table(instance, image_from_url)
        return instance

    def update(self, instance, validated_data):
        image_from_url = validated_data.pop('image_from_url', None)
        instance = super().update(instance, validated_data)
        if image_from_url:
            self._download_image_from_url_and_save_to_table(instance, image_from_url)
        return instance
