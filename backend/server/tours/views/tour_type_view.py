from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.tours.models.tour_type import TourType
from server.tours.models.tour import Tour
from server.lang_query_serializer import LangQuerySerializer
from server.tours.serializers.tour_type_serializer import TourTypeSerializer


class TourTypeView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        query_serializer=LangQuerySerializer(),
        responses={200: TourTypeSerializer(many=True)},
        operation_summary="Get a list of existing Tour Types",
    )
    def get(self, request):
        """
        Returns list of existing Tour Types
        """
        category_query_serializer = LangQuerySerializer(data=request.query_params)
        category_query_serializer.is_valid(raise_exception=True)

        lang = category_query_serializer.validated_data.get("lang")

        # Only return types that have at least one tour
        type_ids_with_tours = Tour.objects.values_list(
            "types__id", flat=True
        ).distinct()
        tour_types = TourType.objects.filter(id__in=type_ids_with_tours).order_by(
            "ordering"
        )

        serializer = TourTypeSerializer(
            instance=tour_types, many=True, context={"lang": lang}
        )

        return Response(data=serializer.data, status=status.HTTP_200_OK)
