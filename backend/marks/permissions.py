from rest_framework import permissions

class IsAssignedTeacherInSection(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role.name == "Teacher"

    def has_object_permission(self, request, view, obj):
        return obj.section.teacher.user == request.user
