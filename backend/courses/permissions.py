from rest_framework import permissions

class IsSystemAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role.name == "System Admin"

    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user.role.name == "System Admin"
        return request.user and request.user.is_authenticated
