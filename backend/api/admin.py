"""File for adding models to the admin panel."""

from django.contrib import admin
from api.models import Prompt, Profile


admin.site.register(Profile)
admin.site.register(Prompt)
