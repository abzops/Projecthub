# backend/projects/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Tag, Comment

# --- User Serializer ---
# We need a simple serializer for the User model to display author information.
# We only want to expose the user's ID and username, not sensitive info like the password hash.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


# --- Tag Serializer ---
# This serializer is very simple. It just converts a Tag object to its name.
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


# --- Comment Serializer ---
# This will serialize the comments for a project.
# We include the author's username for easy display on the frontend.
class CommentSerializer(serializers.ModelSerializer):
    # By default, 'author' would just be the user's ID.
    # By specifying our UserSerializer, we get a nested object with 'id' and 'username'.
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'body', 'created_at']


# --- Project Serializer (for List View) ---
# This serializer will be used for the list of all projects on the homepage.
# It provides a concise summary of each project.
class ProjectListSerializer(serializers.ModelSerializer):
    # We show the author's username and the tags associated with the project.
    author = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        # We select a subset of fields for the list view to keep it lightweight.
        fields = ['id', 'title', 'author', 'cover_image', 'tags', 'created_at']


# --- Project Serializer (for Detail View) ---
# This serializer provides all the detailed information for a single project.
# It inherits from the list serializer and adds more fields.
class ProjectDetailSerializer(ProjectListSerializer):
    # In addition to the list fields, we include the full description and links.
    # We also include all comments related to this project.
    comments = CommentSerializer(many=True, read_only=True)

    class Meta(ProjectListSerializer.Meta):
        # Add the extra fields needed for the detail page.
        fields = ProjectListSerializer.Meta.fields + ['description', 'github_link', 'live_demo_link', 'comments']

