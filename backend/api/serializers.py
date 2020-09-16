from rest_framework.serializers import ModelSerializer

from api.models import User, Table, TableColumn, Task


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


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
    columns = TableColumnDetailSerializer(many=True)
    users = UserDetailSerializer(many=True)

    class Meta:
        model = Table
        fields = '__all__'
