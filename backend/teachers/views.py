from rest_framework import viewsets
from .models import Teacher
from .serializers import TeacherWithAssignedCourseSerializer
from .permissions import IsSystemAdminOrCanModifyStudentProfile

class TeacherViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSystemAdminOrCanModifyStudentProfile]
    queryset = Teacher.objects.select_related('user').all()
    serializer_class = TeacherWithAssignedCourseSerializer