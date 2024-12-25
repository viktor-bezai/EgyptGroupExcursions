from rest_framework import serializers

from server.tours.models import Tour
from server.tours.serializers.tour_category_serializer import TourCategorySerializer


class TourSerializer(serializers.ModelSerializer):
    category = TourCategorySerializer()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = [
            'id',
            'title',
            'image',
            'category',
            'description',
            'cost_from',
            'cost_to',
            'is_available',
        ]

    def get_title(self, obj):
        lang = self.context.get('lang', 'ru')
        # Dynamically fetch the name field based on the language
        name_field = f"title_{lang}"
        return getattr(obj, name_field, obj.title_ru)  # Fallback to English if the field is missing

    def get_description(self, obj):
        lang = self.context.get('lang', 'ru')
        # Dynamically fetch the name field based on the language
        name_field = f"description_{lang}"
        return getattr(obj, name_field, obj.description_ru)  # Fallback to English if the field is missing
