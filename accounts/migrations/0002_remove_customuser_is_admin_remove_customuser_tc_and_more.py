# Generated by Django 5.1.7 on 2025-03-31 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='is_admin',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='tc',
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_roles',
            field=models.CharField(choices=[('admin', 'Admin'), ('consumer', 'Consumer')], default='consumer', max_length=10),
        ),
    ]
