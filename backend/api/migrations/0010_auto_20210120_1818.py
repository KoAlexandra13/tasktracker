# Generated by Django 3.0.8 on 2021-01-20 18:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_user_email_verified'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='email_verified',
            new_name='is_email_verified',
        ),
    ]