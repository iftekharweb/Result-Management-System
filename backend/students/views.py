from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from .permissions import IsSystemAdminOrReadOnly

class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSystemAdminOrReadOnly]
    queryset = Student.objects.select_related('user').all()
    serializer_class = StudentSerializer
