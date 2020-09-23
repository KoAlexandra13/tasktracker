from django.urls import path

from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from api.views import UserViewSet, TableViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'tables', TableViewSet)

urlpatterns = [
    path('token/obtain', obtain_jwt_token),
    path('tokem/refresh', refresh_jwt_token)
]

urlpatterns += router.urls
