# Generated by Django 3.0.8 on 2020-08-22 11:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200822_1113'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='tablecolumn',
            unique_together={('table', 'index')},
        ),
    ]
