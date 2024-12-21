from rest_framework import serializers


class CategoryQuerySerializer(serializers.Serializer):
    category_id = serializers.IntegerField(required=False)
    category_name = serializers.CharField(required=False)
