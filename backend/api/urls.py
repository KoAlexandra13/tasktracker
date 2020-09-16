from rest_framework import routers

from api.views import UserViewSet, TableViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'tables', TableViewSet)

urlpatterns = []

urlpatterns += router.urls