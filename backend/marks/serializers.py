from rest_framework import serializers
from .models import Mark
from courses.serializers import SectionSerializer
from students.serializers import StudentSerializer


class ReadOnlyMarkSerializer(serializers.ModelSerializer):
    section = SectionSerializer()
    student = StudentSerializer()
    class Meta:
        model = Mark
        fields = ['section', 'student', 'final_exam_marks', 'ct_marks', 'presentation_marks', 'attendance_marks']


class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ['section', 'student', 'final_exam_marks', 'ct_marks', 'presentation_marks', 'attendance_marks']

    def validate(self, data):
        section = data.get('section')
        student = data.get('student')

        if student.semester != section.course.semester:
            raise serializers.ValidationError("The semester of the student does not match the semester of the section.")

        return data

    def validate_section(self, value):
        request = self.context.get('request')
        if request:
            user = request.user
            if value.teacher.user != user:
                raise serializers.ValidationError("You are not assigned to this section.")
        return value
