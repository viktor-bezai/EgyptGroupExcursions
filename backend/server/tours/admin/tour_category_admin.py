from django.contrib import admin


class TourCategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name_ru", "ordering"]
    list_display_links = ["id", "name_ru"]
    ordering = ["ordering"]
