from rest_framework.viewsets import ModelViewSet
from .models import Course
from .permissions import IsSystemAdminOrReadOnly
from .serializers import CourseSerializer

class CourseViewSet(ModelViewSet):
    permission_classes = [IsSystemAdminOrReadOnly]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer