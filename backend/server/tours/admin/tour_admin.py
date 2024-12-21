from django.contrib import admin


class TourAdmin(admin.ModelAdmin):
    list_display = ["title", "category__name", "cost_from", "cost_to", "is_available"]
