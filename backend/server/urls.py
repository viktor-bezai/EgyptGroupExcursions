from django.urls import include, path

app_name = "api_v1"

urlpatterns = [
    # TOURS
    path("tours/", include("server.tours.urls")),
    # SOCIAL MEDIA POSTS
    path("social-media-posts/", include("server.social_media_posts.urls")),
    # NOTIFICATIONS
    path("notifications/", include("server.notifications.urls")),
    # CONTACTS
    path("contact/", include("server.contacts.urls")),
]
