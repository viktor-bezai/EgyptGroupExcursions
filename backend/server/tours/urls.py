from django.urls import path

from server.tours.views.category_view import CategoryView
from server.tours.views.tour_view import TourView

urlpatterns = [
    path('', TourView.as_view(), name='api-tours'),
    path('categories/', CategoryView.as_view(), name='api-categories'),
]
