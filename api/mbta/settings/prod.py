import os
from .core import *

ALLOWED_HOSTS = ["mbta-api"]

DEBUG = False
SECRET_KEY = os.getenv(
    "SECRET_KEY", "(w%e*18h0$e5t$_#34!v&%92qdbjey3r$=+f@mz)b18abxnrv3"
)
