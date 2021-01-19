from django.db.models import Q
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
            'email', 'organization', 'image', 'about'
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

    class Meta:
        model = Table
        fields = '__all__'
