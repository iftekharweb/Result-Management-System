from rest_framework import viewsets, generics
from .models import Student
from .serializers import StudentSerializer, StudentCreateSerializer
from .permissions import IsSystemAdminOrCanModifyStudentProfile

class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSystemAdminOrCanModifyStudentProfile]
    queryset = Student.objects.select_related('user').all()
    serializer_class = StudentSerializer


class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentCreateSerializer