from django.urls import path

from server.social_media.views.social_media_post_view import SocialMediaPostView
from server.tours.views.tour_category_view import TourCategoryView
from server.tours.views.tour_detail_view import TourDetailView
from server.tours.views.tour_type_view import TourTypeView
from server.tours.views.tour_view import TourView

urlpatterns = [
    path('', SocialMediaPostView.as_view(), name='api-tour-list'),
]
