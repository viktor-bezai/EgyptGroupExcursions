from rest_framework import serializers

from server.notifications.models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            "id",
            "title",
            "description",
            "created_at",
            "updated_at",
        ]

    def get_title(self, obj):
        lang = self.context.get("lang", "ru")
        name_field = f"title_{lang}"
        return getattr(obj, name_field, obj.title_ru)

    def get_description(self, obj):
        lang = self.context.get("lang", "ru")
        name_field = f"description_{lang}"
        return getattr(obj, name_field, obj.description_ru)
