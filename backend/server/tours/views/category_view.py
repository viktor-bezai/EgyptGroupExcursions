from django.utils.translation import activate
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.tours.models import Category
from server.tours.serializers.category_query_serializer import CategoryQuerySerializer
from server.tours.serializers.category_serializer import CategorySerializer


class CategoryView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(
        query_serializer=CategoryQuerySerializer(),
        responses={200: CategorySerializer(many=True)},
        operation_summary="Get a list of existing categories",
    )
    def get(self, request):
        """
        Returns list of existing Categories
        """
        category_query_serializer = CategoryQuerySerializer(data=request.query_params)
        category_query_serializer.is_valid(raise_exception=True)

        lang = category_query_serializer.validated_data.get("lang")

        categories = Category.objects.all()

        serializer = CategorySerializer(instance=categories, many=True, context={"lang": lang})

        return Response(data=serializer.data, status=status.HTTP_200_OK)
