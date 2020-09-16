from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from api.models import (
    User, Table
)
from api.serializers import (
    UserDetailSerializer, TableDetailSerializer
)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = []


class TableViewSet(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableDetailSerializer
    permission_classes = []
