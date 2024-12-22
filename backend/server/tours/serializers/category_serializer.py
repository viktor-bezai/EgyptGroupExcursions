from rest_framework import serializers
from server.tours.models import Category


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
        ]

    def get_name(self, obj):
        lang = self.context.get('lang', 'ru')
        # Dynamically fetch the name field based on the language
        name_field = f"name_{lang}"
        return getattr(obj, name_field, obj.name_ru)  # Fallback to English if the field is missing
