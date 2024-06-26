# Generated by Django 5.0.4 on 2024-04-05 20:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('academy', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('TID', models.BigIntegerField(unique=True)),
                ('blood_group', models.CharField(choices=[('A+', 'A+'), ('B+', 'B+'), ('AB+', 'AB+'), ('O+', 'O+'), ('A-', 'A-'), ('B-', 'B-'), ('AB-', 'AB-'), ('O-', 'O-')], max_length=10)),
                ('university', models.CharField(default='University of Rajshahi', max_length=255)),
                ('phone_number', models.CharField(blank=True, max_length=255, null=True)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='academy.department')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
