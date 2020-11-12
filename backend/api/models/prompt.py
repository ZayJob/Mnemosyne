"""This module contain Prompt class."""

from django.db import models
from django.contrib.auth.models import User


class Prompt(models.Model):
    """Prompt class with function output and meta data."""

    creater = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    title = models.CharField(max_length=255, blank=True, null=True, verbose_name="Заголовок")
    description = models.TextField(blank=True, null=True, verbose_name="Описание")
    place = models.CharField(max_length=255, blank=True, null=True, verbose_name="Место")
    create_date_time = models.DateTimeField(auto_now=True, blank=True, null=True, verbose_name="Дата создания")
    done_date_time = models.DateTimeField(blank=True, null=True, verbose_name="Дата выполнения")
    complited = models.BooleanField(default=False, blank=True, null=True, verbose_name="Завершено")
    added_users = models.ManyToManyField(User, blank=True, related_name='added_users')

    class Meta:
        """Meta data."""

        verbose_name = 'Напоминание'
        verbose_name_plural = 'Напоминания'

    def __str__(self) -> str:
        """Funtion for output info about this prompt object."""
        return self.title
