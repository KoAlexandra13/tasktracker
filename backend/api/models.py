from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from djchoices import DjangoChoices, ChoiceItem


class User(AbstractUser):
    image = models.ImageField(upload_to='profile/logo/', null=True, blank=True)
    organization = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(_('email address'), blank=True, unique=True)


class Table(models.Model):
    name = models.CharField(max_length=255)
    users = models.ManyToManyField('User', related_name='tables', null=True, blank=True)
    background_color = models.CharField(max_length=10, null=True, blank=True)
    background_image = models.ImageField(upload_to='table/bg/', null=True, blank=True)

    def __str__(self):
        return self.name


class TableColumn(models.Model):
    class Meta:
        unique_together = ["table", "index"]

    name = models.CharField(max_length=255)
    index = models.IntegerField()
    table = models.ForeignKey('Table', on_delete=models.CASCADE, related_name='columns')

    def __str__(self):
        return f'{str(self.table)} : {self.name}'


class Task(models.Model):
    class TaskLabel(DjangoChoices):
        RED = ChoiceItem('red')
        ORANGE = ChoiceItem('orange')
        YELLOW = ChoiceItem('yellow')
        GREEN = ChoiceItem('green')

    column = models.ForeignKey('TableColumn', on_delete=models.CASCADE, related_name='tasks')
    name = models.CharField(max_length=255)
    description = models.TextField()
    label = models.CharField(max_length=10, choices=TaskLabel.choices, null=True, blank=True)
    assigned_users = models.ManyToManyField('User')
    deadline = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{str(self.column)} : {self.name}"


class TaskImage(models.Model):
    task = models.ForeignKey('Task', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='table/task/images/')
