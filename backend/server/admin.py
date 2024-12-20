from django.contrib import admin

from .tours.admin.tour_admin import TourAdmin
from .tours.models import Tour

admin.site.register(Tour, TourAdmin)
