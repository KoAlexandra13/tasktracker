# Generated by Django 3.0.8 on 2021-01-19 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_table_background_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='about',
            field=models.TextField(blank=True, null=True),
        ),
    ]
