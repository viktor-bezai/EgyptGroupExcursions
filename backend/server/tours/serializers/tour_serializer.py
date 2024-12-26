from rest_framework import serializers
from server.tours.models import Tour
from server.tours.serializers.tour_category_serializer import TourCategorySerializer
from server.tours.serializers.tour_type_serializer import TourTypeSerializer


class TourSerializer(serializers.ModelSerializer):
    category = TourCategorySerializer()
    types = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = [
            'id',
            'title',
            'image',
            'category',
            'types',
            'description',
            'cost_from',
            'cost_to',
            'is_available',
        ]

    def get_title(self, obj):
        lang = self.context.get('lang', 'ru')
        name_field = f"title_{lang}"
        return getattr(obj, name_field, obj.title_ru)

    def get_description(self, obj):
        lang = self.context.get('lang', 'ru')
        name_field = f"description_{lang}"
        return getattr(obj, name_field, obj.description_ru)

    def get_types(self, obj):
        lang = self.context.get('lang', 'ru')
        # Serialize the related TourType objects with context
        return TourTypeSerializer(obj.types.all(), many=True, context={'lang': lang}).data
