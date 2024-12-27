from rest_framework import serializers

from server.social_media.models import SocialMediaPost


class SocialMediaPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaPost
        fields = "__all__"
