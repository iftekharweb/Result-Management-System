from rest_framework import viewsets
from .models import Teacher
from .serializers import TeacherWithAssignedCourseSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.select_related('user').all()
    serializer_class = TeacherWithAssignedCourseSerializer