from django.contrib import admin
from django.utils.html import format_html


class TourAdmin(admin.ModelAdmin):
    list_display = ["id", "title_ru", "category__name_ru", "cost_from", "cost_to", "is_available"]
    list_display_links = ["id", "title_ru"]
    readonly_fields = ["image_preview"]

    # Define the layout for the detail page
    fieldsets = (
        ("Image Preview", {
            "fields": ("image_preview",),
        }),
        ("Tour Details", {
            "fields": (
                "image", "title_ru", "title_ukr", "title_en",
                "category", "description_ru", "description_ukr", "description_en",
                "cost_from", "cost_to", "is_available",
            ),
        }),
    )

    # Render the image preview
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-width: 300px; height: auto;" />', obj.image.url)
        return "No Image"

    image_preview.short_description = "Image Preview"
