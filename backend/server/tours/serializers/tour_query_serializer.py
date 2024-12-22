from rest_framework import serializers


class TourQuerySerializer(serializers.Serializer):
    lang = serializers.ChoiceField(
        choices=("ru", "ukr", "en"), required=True, help_text="Language code for localization (default is 'ru')"
    )
    category_id = serializers.IntegerField(required=False)
    category_name = serializers.CharField(required=False)
