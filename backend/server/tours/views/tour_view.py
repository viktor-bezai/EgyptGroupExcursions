from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.tours.models import Tour
from server.tours.serializers.tour_serializer import TourSerializer


class TourView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @swagger_auto_schema(responses={200: TourSerializer(many=True)},
                         operation_summary='Get a list of available tours',
                         operation_description='Retrieves a list containing the details of all currently available '
                                               'Store objects within the database.'
                         )
    def get(self, request):
        """
        Returns list of Tours
        """
        tours = Tour.objects.all()

        serializer = TourSerializer(instance=tours, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
