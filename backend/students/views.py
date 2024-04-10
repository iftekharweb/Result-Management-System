from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from .permissions import IsSystemAdminOrCanModifyStudentProfile

class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSystemAdminOrCanModifyStudentProfile]
    queryset = Student.objects.select_related('user').all()
    serializer_class = StudentSerializer
