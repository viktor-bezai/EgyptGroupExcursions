from rest_framework import serializers

from server.tours.models import Tour


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = [
            'id',
            'title',
            'description',
            'cost_from',
            'cost_to',
            'is_available',
        ]
