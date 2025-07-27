# backend/projects/models.py

from django.db import models
from django.contrib.auth.models import User # We'll use the built-in User model for authors

# --- Tag Model ---
# This model will store the categories or technologies used in a project.
# Examples: "Python", "React", "Machine Learning", "UI/UX"
class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# --- Project Model ---
# This is the core model for our application. It holds all the information
# about a student's project.
class Project(models.Model):
    # --- Basic Information ---
    title = models.CharField(max_length=200, help_text="Enter the project title.")
    description = models.TextField(help_text="Provide a detailed description of the project.")
    
    # --- Links ---
    # We use URLField for links. blank=True and null=True mean these fields are optional.
    github_link = models.URLField(max_length=500, blank=True, null=True, help_text="Link to the project's GitHub repository.")
    live_demo_link = models.URLField(max_length=500, blank=True, null=True, help_text="Link to the live demo, if available.")

    # --- Image ---
    # We use ImageField to handle image uploads.
    # The 'upload_to' parameter specifies the subdirectory within your media folder.
    # A default image can be specified if none is uploaded.
    cover_image = models.ImageField(upload_to='project_images/', default='project_images/default.jpg', help_text="Upload a cover image for the project.")

    # --- Relationships ---
    # ForeignKey creates a many-to-one relationship.
    # One user can be the author of many projects.
    # on_delete=models.CASCADE means if a user is deleted, their projects are also deleted.
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    
    # ManyToManyField creates a many-to-many relationship.
    # One project can have many tags, and one tag can be applied to many projects.
    tags = models.ManyToManyField(Tag, related_name='projects')

    # --- Timestamps ---
    # auto_now_add=True automatically sets the timestamp when a project is first created.
    created_at = models.DateTimeField(auto_now_add=True)
    # auto_now=True updates the timestamp every time the project is saved.
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # This is how the project will be represented in the Django admin panel.
        return f'{self.title} by {self.author.username}'

# --- Comment Model ---
# This model will store comments related to a specific project.
class Comment(models.Model):
    # --- Relationships ---
    # Each comment is linked to one specific project.
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='comments')
    # Each comment is written by one user.
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')

    # --- Content ---
    body = models.TextField(max_length=1000, help_text="Write your comment here.")
    
    # --- Timestamps ---
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # This ensures that the newest comments are shown first.
        ordering = ['-created_at']

    def __str__(self):
        return f'Comment by {self.author.username} on {self.project.title}'

