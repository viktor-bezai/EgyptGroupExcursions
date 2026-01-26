from django.urls import path

from server.contacts.views import ContactView

urlpatterns = [
    path("", ContactView.as_view(), name="contact"),
]
