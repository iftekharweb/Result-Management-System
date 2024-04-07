# Create a file named create_system_admin.py under your app's management/commands directory
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ...models import Role

class Command(BaseCommand):
    help = 'Create a superuser with specified attributes'

    def handle(self, *args, **kwargs):
        User = get_user_model()

        email = "admin@gmail.com"
        first_name = "First"
        last_name = "Admin"
        date_of_birth = "2000-01-01"  # Example date of birth, update as needed

        role, _ = Role.objects.get_or_create(name="System Admin")

        user = User.objects.create_superuser(
            email=email,
            first_name=first_name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            password='admin',  # Set your desired password here
            role=role
        )
        user.role = role
        user.save()

        self.stdout.write(self.style.SUCCESS('Superuser created successfully'))
