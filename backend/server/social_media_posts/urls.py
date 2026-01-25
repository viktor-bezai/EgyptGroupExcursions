from django.urls import path

from server.social_media_posts.views.social_media_post_view import SocialMediaPostView

urlpatterns = [
    path("", SocialMediaPostView.as_view(), name="api-social-media-posts-list"),
]
