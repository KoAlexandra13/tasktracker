from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from djchoices import DjangoChoices, ChoiceItem

from api.tasks import send_mail_verification_email_task
from api.utils import account_activation_token


class User(AbstractUser):
    image = models.ImageField(upload_to='profile/logo/', null=True, blank=True)
    organization = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(_('email address'), blank=True, unique=True)
    about = models.TextField(null=True, blank=True)

    is_email_verified = models.BooleanField(default=False)

    @property
    def fullname(self):
        return f"{self.first_name}{' %s' % self.last_name if self.last_name else ''}"

    def send_email_activation_message(self):
        EmailActivationRequest.objects.filter(
            user=self
        ).delete()

        token = account_activation_token.make_token(self)
        EmailActivationRequest.objects.create(
            token=token,
            user=self
        )

        send_mail_verification_email_task.delay(
            self.fullname,
            self.email,
            token
        )

    @classmethod
    def activate_email(cls, token):
        email_activation_request = EmailActivationRequest.objects.filter(token=token).first()
        if email_activation_request is None:
            return None

        if not account_activation_token.check_token(
            email_activation_request.user, token
        ):
            return None

        user = email_activation_request.user
        user.is_email_verified = True
        user.save()

        email_activation_request.delete()

        return user

    def save(self, *args, **kwargs):
        old_obj = self.__class__.objects.get(pk=self.pk) if self.pk else None
        if old_obj and old_obj.email != self.email:
            self.is_email_verified = False
        return super().save(*args, **kwargs)


class Table(models.Model):
    name = models.CharField(max_length=255)
    users = models.ManyToManyField('User', related_name='tables', null=True, blank=True)
    background_color = models.CharField(max_length=10, null=True, blank=True)
    background_image = models.ImageField(upload_to='table/bg/', null=True, blank=True)

    def __str__(self):
        return self.name


class TableColumn(models.Model):
    name = models.CharField(max_length=255)
    index = models.IntegerField()
    table = models.ForeignKey('Table', on_delete=models.CASCADE, related_name='columns', null=True)

    def __str__(self):
        return f'{str(self.table)} : {self.name}'

    def reindex_tasks(self):
        tasks = self.tasks.order_by('index')
        for index, task in enumerate(tasks):
            task.index = index
        Task.objects.bulk_update(tasks, ['index'])


class Task(models.Model):
    class TaskLabel(DjangoChoices):
        RED = ChoiceItem('red')
        ORANGE = ChoiceItem('orange')
        YELLOW = ChoiceItem('yellow')
        GREEN = ChoiceItem('green')

    column = models.ForeignKey('TableColumn', on_delete=models.CASCADE, related_name='tasks', null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    label = models.CharField(max_length=10, choices=TaskLabel.choices, null=True, blank=True)
    assigned_users = models.ManyToManyField('User', blank=True)
    deadline = models.DateTimeField(null=True, blank=True)
    index = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{str(self.column)} : {self.name}"


class TaskImage(models.Model):
    task = models.ForeignKey('Task', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='table/task/images/')


class EmailActivationRequest(models.Model):
    token = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
