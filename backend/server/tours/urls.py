from django.urls import path

from server.tours.views.category_view import CategoryView
from server.tours.views.tour_detail_view import TourDetailView
from server.tours.views.tour_view import TourView

urlpatterns = [
    path('', TourView.as_view(), name='api-tour-list'),
    path('<int:id>/', TourDetailView.as_view(), name='api-tour-detail'),
    path('categories/', CategoryView.as_view(), name='api-categories'),
]
