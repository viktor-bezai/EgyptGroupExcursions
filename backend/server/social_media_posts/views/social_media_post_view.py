from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.social_media_posts.models import SocialMediaPost
from server.social_media_posts.serializers.social_media_post_serializer import (
    SocialMediaPostSerializer,
)


class SocialMediaPostView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        responses={200: SocialMediaPostSerializer(many=True)},
        operation_summary="Get a list of Social Media Posts",
        operation_description="Retrieves active social media posts with oEmbed data for display.",
    )
    def get(self, request):
        """
        Returns list of active Social Media Posts with oEmbed data.
        Optional query param: ?platform=instagram or ?platform=tiktok
        """
        queryset = SocialMediaPost.objects.filter(is_active=True)

        # Optional filter by platform
        platform = request.query_params.get("platform")
        if platform:
            queryset = queryset.filter(social_media__iexact=platform)

        serializer = SocialMediaPostSerializer(
            instance=queryset,
            many=True,
        )

        return Response(data=serializer.data, status=status.HTTP_200_OK)
