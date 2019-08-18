import csv
import math
import sys
from django.core.management.base import BaseCommand
from itertools import islice

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
        parser.add_argument(
            "--batch-size",
            "-b",
            type=int,
            default=10000,
            help="The number of rows to insert at a time",
        )

    def handle(self, *args, csvs, if_empty, batch_size, **options):
        if if_empty and models.StationInterval.objects.count():
            return

        for csv_file in csvs:
            print(f"Loading {csv_file}...")
            with open(csv_file) as f:
                # Create a lazy generator to iterate through the CSV
                objs = (
                    models.StationInterval(
                        station_id=row["GTFS_STOP_ID"],
                        date=row["DATE"],
                        start_time=row["TIME_PERIOD"],
                        entries=row["STATION_ENTRIES"],
                    )
                    for row in csv.DictReader(f)
                )

                # bulk_create casts its input to a list, so we have to wrap
                # the generator in islice to keep it lazy
                rows_inserted = 0
                while True:
                    sys.stdout.write(
                        f"\r  Inserted {rows_inserted:,} rows ({math.ceil(rows_inserted / batch_size):,} batches)"
                    )
                    batch = list(islice(objs, batch_size))
                    if not batch:
                        break
                    models.StationInterval.objects.bulk_create(batch)
                    rows_inserted += len(batch)
                print("")
