from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.lang_query_serializer import LangQuerySerializer
from server.notifications.models import Notification
from server.notifications.serializers.notification_serializer import NotificationSerializer


class NotificationDetailView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        query_serializer=LangQuerySerializer(),
        responses={200: NotificationSerializer()},
        operation_summary="Get details of a specific Notification",
        operation_description="Retrieves the details of a specific Notification object by its ID.",
    )
    def get(self, request, id):
        """
        Returns details of a specific Notification by ID
        """
        lang = request.query_params.get("lang", "ru")

        notification = get_object_or_404(Notification, id=id)

        # Serialize the tour
        serializer = NotificationSerializer(instance=notification, context={"lang": lang})

        return Response(data=serializer.data, status=status.HTTP_200_OK)
