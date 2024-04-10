from rest_framework import generics
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Mark
from .serializers import MarkSerializer
from .permissions import IsAssignedTeacherInSection


class MarkCreateAPIView(generics.CreateAPIView):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
    permission_classes = [IsAuthenticated, IsAssignedTeacherInSection]


class MarkViewSet(ReadOnlyModelViewSet):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
    permission_classes = [IsAuthenticated]