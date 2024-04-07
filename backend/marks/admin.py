from django.contrib import admin
from .models import Mark

@admin.register(Mark)
class MarkAdmin(admin.ModelAdmin):
    list_display = ('id', 'section', 'student', 'final_exam_marks', 'ct_marks', 'presentation_marks', 'attendance_marks')
    list_filter = ('section', 'student')
    search_fields = ('id', 'student__user__first_name', 'student__user__last_name')


