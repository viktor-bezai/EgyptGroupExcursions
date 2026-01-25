from rest_framework import serializers

from server.social_media_posts.models import SocialMediaPost


class SocialMediaPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaPost
        fields = [
            "id",
            "url",
            "social_media",
            "oembed_html",
            "thumbnail_url",
            "title",
            "display_order",
        ]
