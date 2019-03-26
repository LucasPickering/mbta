import requests
import json
import os

BASE_URL = "https://api-v3.mbta.com/stops?include=parent_station"

def get_stops_url(route_type):

    query_url = 
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
    help = "Get stations locations from MBTA api"

    def add_arguments(self, parser):
        parser.add_argument("--output", "-o", default="data/station_locs.json")

    def handle(self, *args, output, **options):
        
        ## route_type = {0,1}: Light Rail, Subway, Metro
        ## location_type = 1: Stations
        ## https://developers.google.com/transit/gtfs/reference/
        stations = [s for s in get_stops(0) + get_stops(1) if s["attributes"]["location_type"]==1]
        stat_locs = {s["id"]:extract_lat_lon(s) for s in stations}

        with open(output, "w") as f:
            json.dump(stat_locs, f, indent=2)

