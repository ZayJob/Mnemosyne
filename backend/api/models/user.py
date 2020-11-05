"""This module contain Profile class."""

from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    """Profile class with function output and meta data."""

    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    avatar = models.ImageField(upload_to='images/profiles', null=True, blank=True, verbose_name="Фотография")

    class Meta:
        """Meta data."""

        verbose_name = 'Профиль'
        verbose_name_plural = 'Профиль'

    def __str__(self) -> str:
        """Funtion for output info about this profile object."""
        return self.user.email