from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.social_media_posts.models import SocialMediaPost
from server.social_media_posts.serializers.social_media_post_serializer import SocialMediaPostSerializer


class SocialMediaPostView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        responses={200: SocialMediaPostSerializer(many=True)},
        operation_summary="Get a list of Social Media Posts",
        operation_description="Retrieves a list containing the details of all Social Media Posts objects within the database.",
    )
    def get(self, request):
        """
        Returns list of Social Media Posts
        """
        social_media_posts = SocialMediaPost.objects.all()

        serializer = SocialMediaPostSerializer(instance=social_media_posts, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
