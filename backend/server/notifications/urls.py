from django.urls import path

from server.notifications.views.notification_detail_view import NotificationDetailView
from server.notifications.views.notification_view import NotificationView

urlpatterns = [
    path('', NotificationView.as_view(), name='api-notifications-list'),
    path('<int:id>/', NotificationDetailView.as_view(), name='api-notification-detail'),
]
