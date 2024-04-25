from rest_framework import viewsets
from .models import Semester
from .serializers import SemesterSerializer

class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer