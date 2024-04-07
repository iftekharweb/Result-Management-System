from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = (
        'user', 
        'user_first_name',
        'user_last_name',
        'user_date_of_birth',
        'hall', 
        'department', 
        'semester', 
        'SID', 
        'hsc_reg', 
        'blood_group', 
        'university', 
        'phone_number', 
        'session'
    )
    list_filter = ('hall', 'department', 'semester', 'blood_group')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'SID', 'hsc_reg', 'session')
    ordering = ('user__email',)

    def user_first_name(self, obj):
        return obj.user.first_name
    user_first_name.short_description = 'First Name'

    def user_last_name(self, obj):
        return obj.user.last_name
    user_last_name.short_description = 'Last Name'

    def user_date_of_birth(self, obj):
        return obj.user.date_of_birth
    user_date_of_birth.short_description = 'Date of Birth'
