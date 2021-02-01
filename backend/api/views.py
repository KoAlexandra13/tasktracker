from rest_framework.views import status, Response, APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import decorators
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from api.models import (
    User, Table
)
from api.serializers import (
    UserDetailSerializer,
    TableDetailSerializer,
    CustomJWTSerializer
)
from api.models import TableColumn
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
            return Response(UserDetailSerializer(user, context={"request": request}).data, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

    @decorators.action(detail=False, methods=['post'], url_path='resend-activation-mail')
    def resend_activation_mail(self, request, *args, **kwargs):
        request.user.send_email_activation_message()
        return Response("OK", status=status.HTTP_200_OK)

    @decorators.action(detail=False, methods=['get'], url_path='self')
    def get_self(self, request, *args, **kwargs):
        return Response(UserDetailSerializer(request.user, context={"request": request}).data, status=status.HTTP_200_OK)

    @decorators.permission_classes([AllowAny])
    @decorators.action(detail=False, methods=['post'], url_path='email-activate')
    def activate_email(self, request, *args, **kwargs):
        token = request.data.get('token', None)
        if token is None:
            return Response("Token is not specified", status=status.HTTP_400_BAD_REQUEST)

        user = User.activate_email(token)

        if user is None:
            return Response("Token is not valid", status=status.HTTP_400_BAD_REQUEST)

        return Response(UserDetailSerializer(user).data, status=status.HTTP_200_OK)


class TableViewSet(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableDetailSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        users = data.pop('users')
        columns = data.pop('columns')
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        table = serializer.save()

        table.users.add(*list(User.objects.filter(pk__in=users)))

        columns = [
            TableColumn(table=table, **column_data)
            for column_data in columns
        ]

        TableColumn.objects.bulk_create(columns)

        return Response(self.get_serializer(table).data, status=status.HTTP_201_CREATED)
