from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^intervals", views.StationIntervalsView.as_view()),
    url(r"^entries", views.EntriesByStationView.as_view()),
]
