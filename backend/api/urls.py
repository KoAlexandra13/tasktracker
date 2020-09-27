from django.urls import path

from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView
)

from api.views import UserViewSet, TableViewSet, CustomTokenObtainPairView
from api.serializers import CustomJWTSerializer

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'tables', TableViewSet)

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

urlpatterns += router.urls
