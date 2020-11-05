from django.contrib import admin
from django.urls import path, include

from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view


schema_view = get_swagger_view(title="Swagger Docs")

urlpatterns_api = [
    path('docs/', schema_view),
    path('api/v1/', include('api.urls_api')),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
] + urlpatterns_api
