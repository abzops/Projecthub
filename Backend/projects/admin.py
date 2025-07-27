# backend/projects/admin.py

from django.contrib import admin
from .models import Project, Tag, Comment

# Register your models here.
admin.site.register(Project)
admin.site.register(Tag)
admin.site.register(Comment)