import csv
import json
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Generate station metadata"

    def add_arguments(self, parser):
        parser.add_argument("--csvs", "-c", nargs="+", required=True)
        parser.add_argument("--output", "-o", default="data/stations.json")

    def handle(self, *args, csvs, output, **options):
        rows = []
        for csv_file in csvs:
            with open(csv_file) as f:
                lines = f.read().splitlines()
                reader = csv.DictReader(lines)
                rows += reader

        stations = {}
        for row in rows:
            station_id = row["GTFS_STOP_ID"]
            if station_id not in stations:
                stations[station_id] = {
                    "gtfs_id": station_id,
                    "name": row["STATION_NAME"],
                    "lines": [],
                }

        with open(output, "w") as f:
            json.dump(list(stations.values()), f, indent=2)

