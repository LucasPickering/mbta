import csv
import json
import requests
from django.core.management.base import BaseCommand

BASE_URL = "https://api-v3.mbta.com/stops?include=parent_station"

def get_stops_url(route_type):

    return "{0}&filter%5Broute_type%5D={1}".format(BASE_URL, route_type)

def get_stops(route_type):
    url = get_stops_url(route_type)
    resp = requests.get(url)

    return json.loads(resp.text)['included']

def extract_lat_lon(station):
    attr = station["attributes"]
    lat = attr["latitude"]
    lon = attr["longitude"]

    return {"lat":lat, "lon":lon}

class Command(BaseCommand):
    help = "Generate station metadata"

    def add_arguments(self, parser):
        parser.add_argument("--csvs", "-c", nargs="+", required=True)
        parser.add_argument("--routes", "-r", default="data/lines.json")
        parser.add_argument("--output", "-o", default="data/stations.json")

    def handle(self, *args, csvs, routes, output, **options):
        rows = []
        for csv_file in csvs:
            with open(csv_file) as f:
                lines = f.read().splitlines()
                reader = csv.DictReader(lines)
                rows += reader

        ## route_type = {0,1}: Light Rail, Subway, Metro
        ## location_type = 1: Stations
        ## https://developers.google.com/transit/gtfs/reference/
        stations = [s for s in get_stops(0) + get_stops(1) + get_stops(3) if s["attributes"]["location_type"]==1]
        stat_locs = {s["id"]:extract_lat_lon(s) for s in stations}

        # Manually adding Wollaston station (currently under construction)
        stat_locs.update({"place-wlsta": {"lat":42.265638, "lon":-71.01953}})

        with open(routes) as f:
            line_mapping = json.load(f)

        stations = {}
        for row in rows:
            station_id = row["GTFS_STOP_ID"]
            if station_id not in stations:
                stations[station_id] = {
                    "gtfs_id": station_id,
                    "name": row["STATION_NAME"],
                    "lines": line_mapping.get(station_id),
                    "lat": stat_locs.get(station_id,{}).get("lat"),
                    "lon": stat_locs.get(station_id,{}).get("lon")
                }

        with open(output, "w") as f:
            json.dump(stations, f, indent=2)

