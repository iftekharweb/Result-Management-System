from django.contrib import admin
from .models import User, Role

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role', 'date_of_birth', 'is_active', 'is_admin')
    list_filter = ('is_active', 'is_admin')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
