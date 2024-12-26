from django.urls import path

from server.tours.views.tour_category_view import TourCategoryView
from server.tours.views.tour_detail_view import TourDetailView
from server.tours.views.tour_type_view import TourTypeView
from server.tours.views.tour_view import TourView

urlpatterns = [
    path('', TourView.as_view(), name='api-tour-list'),
    path('<int:id>/', TourDetailView.as_view(), name='api-tour-detail'),
    path('categories/', TourCategoryView.as_view(), name='api-tour-categories'),
    path('types/', TourTypeView.as_view(), name='api-tour-types'),
]
