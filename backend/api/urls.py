"""File for urls."""

from django.urls import path

from .views import *


urlpatterns = [
    path('activate/<uidb64>/<token>/', activate),
]