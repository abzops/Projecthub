# backend/projects/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TagViewSet

# Create a router and register our viewsets with it.
# The DefaultRouter automatically creates the URL patterns for us.
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tags', TagViewSet, basename='tag')

# The API URLs are now determined automatically by the router.
# We just need to include the router's URLs in our urlpatterns.
urlpatterns = [
    path('', include(router.urls)),
]
