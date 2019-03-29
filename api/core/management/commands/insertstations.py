import json
from django.core.management.base import BaseCommand

from core import models


class Command(BaseCommand):
    help = "Insert stations from JSON into the DB"

    def add_arguments(self, parser):
        parser.add_argument("--data", "-d", default="data/stations.json")

    def handle(self, *args, data, **options):
        with open(data) as f:
            stations = json.load(f)
        # Create a Station object for each station
        objs = [models.Station(**station) for station in stations.values()]
        models.Station.objects.bulk_create(objs)  # Insert them all
        print(f"Inserted {len(objs)} rows")
