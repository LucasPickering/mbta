from .settings import *

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "[::1]", "api", "*"]

DEBUG = True
SECRET_KEY = "(w%e*18h0$e5t$_#34!v&%92qdbjey3r$=+f@mz)b18abxnrv3"

# docker-compose makes it hard to use INTERNAL_IPS with the toolbar, so we
# just enable it for all requests in dev mode
DEBUG_TOOLBAR_CONFIG = {"SHOW_TOOLBAR_CALLBACK": lambda request: True}
