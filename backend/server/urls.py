from django.urls import include, path

app_name = 'api_v1'

urlpatterns = [
    # TOURS
    path('tours/', include('server.tours.urls')),
]
