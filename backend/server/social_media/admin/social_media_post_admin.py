from django.contrib import admin


class SocialMediaPostAdmin(admin.ModelAdmin):
    list_display = ["id", "url", "social_media"]
    list_display_links = ["id", "url"]
