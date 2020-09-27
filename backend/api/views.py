from rest_framework.views import status, Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import decorators
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from api.models import (
    User, Table
)
from api.serializers import (
    UserDetailSerializer, TableDetailSerializer,
    CustomJWTSerializer
)
from api.permissions import IsSuperUserOrOwner
from api.forms import UserCreationForm


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomJWTSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsSuperUserOrOwner]

    def create(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @decorators.permission_classes([AllowAny])
    @decorators.action(detail=False, methods=['post'], url_path='sign_up')
    def sign_up(self, request, *args, **kwargs):
        form = UserCreationForm(request.data)
        if form.is_valid():
            user = form.save()
            return Response(UserDetailSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

    @decorators.action(detail=False, methods=['get'], url_path='self')
    def get_self(self, request, *args, **kwargs):
        return Response(UserDetailSerializer(request.user).data, status=status.HTTP_200_OK)


class TableViewSet(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableDetailSerializer
