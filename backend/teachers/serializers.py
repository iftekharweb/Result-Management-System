from rest_framework import serializers
from core.serializers import UserSerializer
from academy.serializers import DepartmentSerializer
from courses.serializers import SectionSerializer
from courses.models import Section
from .models import Teacher

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    department = DepartmentSerializer()

    class Meta:
        model = Teacher
        fields = ['id', 'user','department', 'TID', 'blood_group', 'university', 'phone_number']
    

class TeacherWithAssignedCourseSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    department = DepartmentSerializer()
    assigned_sections = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = ['id', 'user','department', 'TID', 'blood_group', 'university', 'phone_number', 'assigned_sections']
    
    def get_assigned_sections(self, obj):
        sections = Section.objects.filter(teacher=obj)
        serializer = SectionSerializer(sections, many=True)
        return serializer.data
    

class TeacherCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = [
            'user', 'department', 
            'TID', 'blood_group', 'university', 
            'phone_number',
        ]

    def create(self, validated_data):
        return Teacher.objects.create(**validated_data)