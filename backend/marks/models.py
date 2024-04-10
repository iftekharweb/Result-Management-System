from django.db import models
from courses.models import Section
from students.models import Student

class Mark(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    final_exam_marks = models.DecimalField(max_digits=10, decimal_places=4, default=0.0)
    ct_marks = models.DecimalField(max_digits=10, decimal_places=4, default=0.0)
    presentation_marks = models.DecimalField(max_digits=10, decimal_places=4, default=0.0)
    attendance_marks = models.DecimalField(max_digits=10, decimal_places=4, default=0.0)


