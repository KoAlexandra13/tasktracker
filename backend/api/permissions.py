from rest_framework.permissions import BasePermission
from api.models import User


class IsSuperUserOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_superuser
            or (isinstance(obj, User) and obj == request.user)
            or (hasattr(obj, 'owner') and getattr(obj, 'owner', None) == request.user)
        )
