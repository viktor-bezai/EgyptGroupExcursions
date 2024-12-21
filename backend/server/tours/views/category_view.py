from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.tours.models import Tour, Category
from server.tours.serializers.category_query_serializer import CategoryQuerySerializer
from server.tours.serializers.category_serializer import CategorySerializer
from server.tours.serializers.tour_serializer import TourSerializer


class CategoryView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        responses={200: CategorySerializer(many=True)},
        operation_summary='Get a list of existing categories',
    )
    def get(self, request):
        """
        Returns list of existing Categories
        """
        categories = Category.objects.all()

        serializer = CategorySerializer(instance=categories, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
