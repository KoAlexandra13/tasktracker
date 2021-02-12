# Generated by Django 3.0.8 on 2021-02-10 23:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20210209_2339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tablecolumn',
            name='table',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='columns', to='api.Table'),
        ),
        migrations.AlterField(
            model_name='task',
            name='column',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='api.TableColumn'),
        ),
    ]