import os
from .settings import *

ALLOWED_HOSTS = ["mbta.lucaspickering.me"]
DEBUG = False
SECRET_KEY = os.environ["MBTA_SECRET_KEY"]
