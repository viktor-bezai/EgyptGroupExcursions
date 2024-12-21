from rest_framework import serializers

from server.tours.models import Tour, Category


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
        ]
