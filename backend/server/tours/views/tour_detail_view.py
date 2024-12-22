from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.tours.models import Tour
from server.tours.serializers.lang_query_serializer import LangQuerySerializer
from server.tours.serializers.tour_serializer import TourSerializer


class TourDetailView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        query_serializer=LangQuerySerializer(),
        responses={200: TourSerializer()},
        operation_summary="Get details of a specific tour",
        operation_description="Retrieves the details of a specific Tour object by its ID.",
    )
    def get(self, request, id):
        """
        Returns details of a specific Tour by ID
        """
        lang = request.query_params.get("lang", "ru")

        tour = get_object_or_404(Tour, id=id)

        # Serialize the tour
        serializer = TourSerializer(instance=tour, context={"lang": lang})

        return Response(data=serializer.data, status=status.HTTP_200_OK)
