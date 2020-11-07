from rest_framework import viewsets, permissions
from django.contrib.auth.models import User

from api.models import Prompt

from .serializers import PromptSerializer, UserSerializer


class PromptViewSet(viewsets.ModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
