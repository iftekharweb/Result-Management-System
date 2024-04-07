from django.db import models
from django.contrib import admin
from core.models import User
from academy.models import Hall, Department
from semesters.models import Semester

# Create your models here.

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    SID = models.BigIntegerField(unique=True)
    hsc_reg = models.BigIntegerField(unique=True)

    BLOOD_GROUP_CHOICE = [
        ('A+', 'A+'),
        ('B+', 'B+'),
        ('AB+', 'AB+'),
        ('O+', 'O+'),
        ('A-', 'A-'),
        ('B-', 'B-'),
        ('AB-', 'AB-'),
        ('O-', 'O-'),
    ]
    blood_group = models.CharField(max_length=10, choices=BLOOD_GROUP_CHOICE)

    university = models.CharField(max_length=255, default='University of Rajshahi')
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    session = models.CharField(max_length=255, default='2018-2019')

    def __str__(self) -> str:
        return f'{self.SID}'

