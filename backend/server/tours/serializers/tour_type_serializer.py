from rest_framework import serializers
from server.tours.models.tour_type import TourType


class TourTypeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = TourType
        fields = [
            "id",
            "name",
        ]

    def get_name(self, obj):
        lang = self.context.get("lang", "ru")
        return obj.get_name(lang)
