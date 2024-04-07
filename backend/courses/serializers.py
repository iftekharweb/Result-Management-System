from rest_framework import serializers
from academy.serializers import DepartmentSerializer
from semesters.serializers import SemesterSerializer
from .models import Course, Section

class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    semester = SemesterSerializer()

    class Meta:
        model = Course
        fields = ['code', 'title', 'department', 'semester', 'type', 'credit']

class SectionSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Section
        fields = ['id', 'course', 'section']
