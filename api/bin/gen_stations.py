#!/usr/bin/env python3

import argparse
import csv
import json


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download data")
    parser.add_argument("--csvs", "-c", nargs="+", required=True)
    parser.add_argument("--output", "-o", default="data/stations.json")
    args = parser.parse_args()

    rows = []
    for csv_file in args.csvs:
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

    with open(args.output, "w") as f:
        json.dump(list(stations.values()), f, indent=2)
