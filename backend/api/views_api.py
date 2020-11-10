from django.contrib.auth.models import User
from django.http import JsonResponse, request

from api.models import Prompt
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import MockPromptSerializer, PromptSerializer, UserSerializer


class PromptViewSet(viewsets.ModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

    @action(detail=False, methods=['post'])
    def my_prompts(self, request, *args, **kwargs):
        """Action to get your prompts."""
        if 'id_user' in request.data:
            id_user = request.data['id_user']
            del request.data['id_user']
            user = User.objects.get(id=id_user)
            queryset = Prompt.objects.filter(creater=user)
            serializer = MockPromptSerializer(queryset, many=True)
            return Response({'result': serializer.data})
        else:
            return Response(status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def others_prompts(self, request, *args, **kwargs):
        """Action to get prompts when you added in prompt."""
        if 'id_user' in request.data:
            id_user = request.data['id_user']
            del request.data['id_user']
            user = User.objects.get(id=id_user)
            queryset = filter(lambda x: user in x.added_users.all(), Prompt.objects.all())
            serializer = MockPromptSerializer(queryset, many=True)
            return Response({'result': serializer.data})
        else:
            return Response(status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def all_prompts(self, request, *args, **kwargs):
        """Action to get all prompts when you creater and added in prompt."""
        if 'id_user' in request.data:
            id_user = request.data['id_user']
            del request.data['id_user']
            user = User.objects.get(id=id_user)
            others_queryset = filter(lambda x: user in x.added_users.all(), Prompt.objects.all())
            my_queryset = Prompt.objects.filter(creater=user)
            queryset = list(my_queryset) + list(others_queryset)
            serializer = MockPromptSerializer(queryset, many=True)
            return Response({'result': serializer.data})
        else:
            return Response(status.HTTP_400_BAD_REQUEST)

    @action(detail=True)
    def complite(self, request, pk, *args, **kwargs):
        """Action for changes prompt complite status."""
        try:
            prompt = Prompt.objects.get(id=pk)
            prompt.complited = True
            prompt.save()
            return Response(status.HTTP_200_OK)
        except Exception:
            return Response(status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
