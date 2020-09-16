from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.admin import ModelAdmin, StackedInline
from django.contrib.admin.widgets import ForeignKeyRawIdWidget

from api.models import (
    User, Task, TableColumn, Table
)

admin.site.unregister(Group)


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None,
         {'fields': ('username', 'password')}
         ),
        ('Personal info',
         {'fields': ('first_name', 'last_name', 'email', 'image')}
         ),
        ('Permissions',
         {'fields': ('is_active', 'is_staff', 'is_superuser')}
         ),
        ('Important dates',
         {'fields': ('last_login', 'date_joined')})
    )


@admin.register(Task)
class TaskAdmin(ModelAdmin):
    pass


class TaskInline(StackedInline):
    model = Task


@admin.register(TableColumn)
class TableColumnAdmin(ModelAdmin):
    inlines = [TaskInline]


class TableColumnInline(StackedInline):
    model = TableColumn


@admin.register(Table)
class TableAdmin(ModelAdmin):
    inlines = [TableColumnInline]
