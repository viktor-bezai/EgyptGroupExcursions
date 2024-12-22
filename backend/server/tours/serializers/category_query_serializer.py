from rest_framework import serializers


class CategoryQuerySerializer(serializers.Serializer):
    lang = serializers.ChoiceField(
        choices=("ru", "ukr", "en"), required=True, help_text="Language code for localization (default is 'en')"
    )
