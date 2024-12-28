from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.lang_query_serializer import LangQuerySerializer
from server.notifications.models import Notification
from server.notifications.serializers.notification_serializer import NotificationSerializer


class NotificationView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        query_serializer=LangQuerySerializer(),
        responses={200: NotificationSerializer(many=True)},
        operation_summary="Get a list of Notifications",
        operation_description="Retrieves a list containing the details of all Notifications.",
    )
    def get(self, request):
        """
        Returns list of Notifications
        """
        lang_query_serializer = LangQuerySerializer(data=request.query_params)
        lang_query_serializer.is_valid(raise_exception=True)

        lang = lang_query_serializer.validated_data.get("lang")

        notifications = Notification.objects.all().order_by("-id")[:5]

        serializer = NotificationSerializer(instance=notifications, many=True, context={"lang": lang})

        return Response(data=serializer.data, status=status.HTTP_200_OK)
