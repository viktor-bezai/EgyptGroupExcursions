from django.urls import path

from server.tours.views.tour_view import TourView

urlpatterns = [
    path('', TourView.as_view(), name='api-tours'),
]
