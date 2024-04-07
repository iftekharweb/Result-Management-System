from rest_framework import serializers
from core.serializers import UserSerializer
from academy.serializers import HallSerializer, DepartmentSerializer
from .models import Student




class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    hall = HallSerializer()
    department = DepartmentSerializer()

    class Meta:
        model = Student
        fields = ['id','user', 'hall', 'department', 'semester', 'SID', 'hsc_reg', 'blood_group', 'university', 'phone_number', 'session']
