"""This module contain Profile class."""

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    """Profile class with function output and meta data."""

    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    avatar = models.ImageField(default='images/profiles/avatar.png', upload_to='images/profiles', null=True, blank=True, verbose_name="Фотография")

    class Meta:
        """Meta data."""

        verbose_name = 'Профиль'
        verbose_name_plural = 'Профиль'

    def __str__(self) -> str:
        """Funtion for output info about this profile object."""
        return self.user.email


@receiver(post_save, sender=User)
def ensure_profile_exists(sender, **kwargs):
    """Сreating a profile after user registration."""
    if kwargs.get('created', False):
        Profile.objects.get_or_create(user=kwargs.get('instance'))