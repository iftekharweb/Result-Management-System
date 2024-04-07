from django.contrib import admin
from .models import Teacher

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'user', 
        'user_first_name',
        'user_last_name',
        'user_date_of_birth',
        'department', 
        'TID', 
        'blood_group', 
        'university', 
        'phone_number'
    )
    search_fields = ('user__first_name', 'user__last_name', 'department__name')
    list_filter = ('department', 'blood_group')
    ordering = ('id',)
    
    def user_first_name(self, obj):
        return obj.user.first_name
    user_first_name.short_description = 'First Name'

    def user_last_name(self, obj):
        return obj.user.last_name
    user_last_name.short_description = 'Last Name'

    def user_date_of_birth(self, obj):
        return obj.user.date_of_birth
    user_date_of_birth.short_description = 'Date of Birth'

