from django.contrib import admin

from .tours.admin.tour_category_admin import TourCategoryAdmin
from .tours.admin.tour_admin import TourAdmin
from .tours.admin.tour_type_admin import TourTypeAdmin
from .tours.models import Tour, TourCategory
from .tours.models.tour_type import TourType

admin.site.register(Tour, TourAdmin)
admin.site.register(TourCategory, TourCategoryAdmin)
admin.site.register(TourType, TourTypeAdmin)
