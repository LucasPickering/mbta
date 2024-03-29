from django.conf import settings
from django.conf.urls import include, url

urlpatterns = [url(r"^api/", include("core.urls"))]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
