from django.conf.urls import url
from django.urls import path

from .views import *


urlpatterns = [
    path('activate/<uidb64>/<token>/', activate),
]