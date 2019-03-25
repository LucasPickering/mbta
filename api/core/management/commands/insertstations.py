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
        for station in stations:
            models.Station.objects.create(**station)
