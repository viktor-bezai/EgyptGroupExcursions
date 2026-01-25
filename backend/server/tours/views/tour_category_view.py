from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.tours.models import TourCategory
from server.tours.serializers.tour_category_serializer import TourCategorySerializer
from server.lang_query_serializer import LangQuerySerializer


class TourCategoryView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        query_serializer=LangQuerySerializer(),
        responses={200: TourCategorySerializer(many=True)},
        operation_summary="Get a list of existing Tour Categories",
    )
    def get(self, request):
        """
        Returns list of existing Tour Categories
        """
        category_query_serializer = LangQuerySerializer(data=request.query_params)
        category_query_serializer.is_valid(raise_exception=True)

        lang = category_query_serializer.validated_data.get("lang")

        tour_categories = TourCategory.objects.all().order_by("ordering")

        serializer = TourCategorySerializer(
            instance=tour_categories, many=True, context={"lang": lang}
        )

        return Response(data=serializer.data, status=status.HTTP_200_OK)
