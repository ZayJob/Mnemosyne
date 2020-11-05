from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

from .views_api import UserViewSet, PromptViewSet


name_apps = 'api'

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'prompts', PromptViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
