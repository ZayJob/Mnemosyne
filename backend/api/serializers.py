from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import Prompt


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class PromptSerializer(serializers.ModelSerializer):
    added_users = UserSerializer(many=True, read_only=True)
    user = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Prompt
        fields = ['id', 'user', 'title', 'added_users']
