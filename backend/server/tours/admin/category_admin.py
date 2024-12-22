from django.contrib import admin


class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name_ru"]
    list_display_links = ["id", "name_ru"]
