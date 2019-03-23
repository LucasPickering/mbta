from django.conf.urls import include, url

urlpatterns = [url(r"^api/", include("core.urls"))]
