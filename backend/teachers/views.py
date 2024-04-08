from rest_framework import viewsets
from .models import Teacher
from .serializers import TeacherWithAssignedCourseSerializer
from .permissions import IsSystemAdminOrReadOnly

class TeacherViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSystemAdminOrReadOnly]
    queryset = Teacher.objects.select_related('user').all()
    serializer_class = TeacherWithAssignedCourseSerializer