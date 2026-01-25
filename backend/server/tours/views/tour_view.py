from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.tours.models import Tour
from server.tours.serializers.tour_query_serializer import TourQuerySerializer
from server.tours.serializers.tour_serializer import TourSerializer


class TourView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        query_serializer=TourQuerySerializer(),
        responses={200: TourSerializer(many=True)},
        operation_summary="Get a list of available tours",
        operation_description="Retrieves a list containing the details of all currently available "
        "Tour objects within the database.",
    )
    def get(self, request):
        """
        Returns list of Tours
        """
        tour_query_serializer = TourQuerySerializer(data=request.query_params)
        tour_query_serializer.is_valid(raise_exception=True)

        lang = tour_query_serializer.validated_data.get("lang")
        category_id = tour_query_serializer.validated_data.get("category_id")
        category_name = tour_query_serializer.validated_data.get("category_name")

        tours = Tour.filter_tours(
            lang=lang, category_id=category_id, category_name=category_name
        )

        serializer = TourSerializer(instance=tours, many=True, context={"lang": lang})

        return Response(data=serializer.data, status=status.HTTP_200_OK)
