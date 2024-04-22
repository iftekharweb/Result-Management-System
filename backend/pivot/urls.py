
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('core.urls')),
    path('', include('students.urls')),
    path('', include('teachers.urls')),
    path('', include('courses.urls')),
    path('', include('marks.urls')),
    path("__debug__/", include("debug_toolbar.urls")),
]
