import csv
from django.core.management.base import BaseCommand

from core import models


class Command(BaseCommand):
    help = "Insert row data from CSVs into the DB"

    def add_arguments(self, parser):
        parser.add_argument("csvs", nargs="+")
        parser.add_argument(
            "--if-empty",
            "-e",
            action="store_true",
            help="Only insert data if the table is empty",
        )

    def handle(self, *args, csvs, if_empty, **options):
        if if_empty and models.StationInterval.objects.count():
            return

        for csv_file in csvs:
            print(f"Loading {csv_file}...")
            with open(csv_file) as f:
                rows = list(csv.DictReader(f))

            # Add all these objects to the list
            objs = [
                models.StationInterval(
                    station_id=row["GTFS_STOP_ID"],
                    date=row["DATE"],
                    start_time=row["TIME_PERIOD"],
                    entries=row["STATION_ENTRIES"],
                )
                for row in rows
            ]

            # Insert them all
            models.StationInterval.objects.bulk_create(objs, batch_size=10000)
            print(f"Inserted {len(objs)} rows")
