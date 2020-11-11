"""File to create serializers."""

from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import Prompt, Profile


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['avatar']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'last_login', 'last_name', 'first_name', 'profile']


class PromptSerializer(serializers.ModelSerializer):
    added_users = UserSerializer(many=True, read_only=True)
    creater = UserSerializer(read_only=True)
    creater_id = serializers.IntegerField()
    added_users_name = serializers.ListField(
        child=serializers.CharField(min_length=1, allow_blank=True),
        min_length=0,
        required=False
    )

    class Meta:
        model = Prompt
        fields = '__all__'

    def create(self, validated_data):
        """
        Creation of a reminder object,
        where the creation and binding of users,
        who were added to the reminder by the creator.
        """
        uid = validated_data.pop('creater_id')
        users_name = validated_data.pop('added_users_name')

        added_users = [User.objects.get(username=name) for name in users_name]

        user_instance = User.objects.get(id=uid)
        prompt_instance = Prompt.objects.create(**validated_data, creater=user_instance)
        prompt_instance.added_users.set(added_users)
        return prompt_instance


class MockPromptSerializer(serializers.ModelSerializer):
    added_users = UserSerializer(many=True, read_only=True)
    creater = UserSerializer(read_only=True)

    class Meta:
        model = Prompt
        fields = '__all__'
