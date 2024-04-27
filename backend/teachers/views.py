from rest_framework import viewsets, generics
from .models import Teacher
from .serializers import TeacherWithAssignedCourseSerializer, TeacherCreateSerializer
from .permissions import IsSystemAdminOrCanModifyStudentProfile

class TeacherViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSystemAdminOrCanModifyStudentProfile]
    queryset = Teacher.objects.select_related('user').all()
    serializer_class = TeacherWithAssignedCourseSerializer


class TeacherCreateView(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherCreateSerializer