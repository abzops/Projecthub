# backend/core/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # The Django admin site
    path('admin/', admin.site.urls),

    # This is the line we're adding.
    # It tells Django that any URL starting with 'api/' should be
    # handled by the urls defined in our 'projects' app.
    path('api/', include('projects.urls')),
]

# This is a helper for serving media files (like uploaded images)
# during development. It's not for production use.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

