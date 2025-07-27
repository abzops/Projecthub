# backend/projects/views.py

from rest_framework import viewsets, permissions
from .models import Project, Tag
from .serializers import ProjectListSerializer, ProjectDetailSerializer, TagSerializer

# --- ProjectViewSet ---
# This viewset automatically provides `list`, `create`, `retrieve`,
# `update`, and `destroy` actions for the Project model.
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing projects.

    Provides two endpoints:
    - `/projects/` (GET): A list of all projects (using the summary serializer).
    - `/projects/{id}/` (GET): The full details of a single project.
    """
    # We want to allow any user (even unauthenticated ones) to view projects.
    permission_classes = [permissions.AllowAny]
    
    # The base queryset that retrieves all projects from the database.
    queryset = Project.objects.all().order_by('-created_at')

    # This method dynamically chooses the serializer based on the action.
    def get_serializer_class(self):
        # If the action is 'retrieve' (meaning we're looking at a single project),
        # use the detailed serializer.
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        
        # For any other action (like 'list'), use the summary serializer.
        return ProjectListSerializer


# --- TagViewSet ---
# This viewset provides a read-only endpoint to list all available tags.
# This will be useful for creating filter buttons on the frontend.
class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing tags.
    Provides one endpoint:
    - `/tags/` (GET): A list of all tags.
    """
    permission_classes = [permissions.AllowAny]
    queryset = Tag.objects.all().order_by('name')
    serializer_class = TagSerializer

