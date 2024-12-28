from django.contrib import admin


class NotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "title_ru", "created_at", "updated_at"]
    list_display_links = ["id", "title_ru"]
