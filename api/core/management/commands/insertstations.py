import json
from django.core.management.base import BaseCommand

from core import models


class Command(BaseCommand):
    help = "Insert stations from JSON into the DB"

    def add_arguments(self, parser):
        parser.add_argument("--data", "-d", default="data/stations.json")
        parser.add_argument(
            "--if-empty",
            "-e",
            action="store_true",
            help="Only insert data if the table is empty",
        )

    def handle(self, *args, data, if_empty, **options):
        if if_empty and models.Station.objects.count():
            return

        with open(data) as f:
            stations = json.load(f)
        # Create a Station object for each station
        objs = [models.Station(**station) for station in stations.values()]
        models.Station.objects.bulk_create(objs)  # Insert them all
        print(f"Inserted {len(objs)} rows")
