from django.contrib import admin


class TourAdmin(admin.ModelAdmin):
    list_display = ["id", "title_ru", "category__name_ru", "cost_from", "cost_to", "is_available"]
