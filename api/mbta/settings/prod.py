import os
from .core import *

ALLOWED_HOSTS = ["mbta-api"]
DEBUG = False
SECRET_KEY = os.environ["MBTA_SECRET_KEY"]
