from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^stations", views.StationsView.as_view()),
    url(r"^intervals", views.intervals),
    url(r"^entries", views.EntriesByStationView.as_view()),
]
