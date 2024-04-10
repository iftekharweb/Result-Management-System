from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MarkCreateAPIView, MarkViewSet

router = DefaultRouter()
router.register(r'marks', MarkViewSet, basename='mark')

urlpatterns = [
    path('marks/create/', MarkCreateAPIView.as_view(), name='mark-create'),
    path('', include(router.urls)),
]
