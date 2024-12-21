from rest_framework import serializers

from server.tours.models import Tour
from server.tours.serializers.category_serializer import CategorySerializer


class TourSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Tour
        fields = [
            'id',
            'title',
            'category',
            'description',
            'cost_from',
            'cost_to',
            'is_available',
        ]
