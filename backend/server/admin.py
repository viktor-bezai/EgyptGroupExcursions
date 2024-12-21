from django.contrib import admin

from .tours.admin.category_admin import CategoryAdmin
from .tours.admin.tour_admin import TourAdmin
from .tours.models import Tour, Category

admin.site.register(Tour, TourAdmin)
admin.site.register(Category, CategoryAdmin)
