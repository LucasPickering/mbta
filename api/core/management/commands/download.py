import io
import json
import os
import requests
import zipfile
from django.core.management.base import BaseCommand


def download(url):
    print(f"Downloading {url}...")
    r = requests.get(url)
    r.raise_for_status()
    return r


def extract(response, csv_name, output_dir):
    f = io.BytesIO(response.content)
    zf = zipfile.ZipFile(f)
    dest_path = os.path.join(output_dir, os.path.basename(csv_name))

    with zf.open(csv_name) as infile, open(dest_path, "w") as outfile:
        outfile.write(infile.read().decode("utf-8-sig"))

    print(f"Extracted to {dest_path}")


class Command(BaseCommand):
    help = "Download CSV data"

    def add_arguments(self, parser):
        parser.add_argument("--urls", "-u", default="data/urls.json")
        parser.add_argument("--output", "-o", default="data/")

    def handle(self, *args, urls, output, **options):
        with open(urls) as f:
            url_objs = json.load(f)

        for url_obj in url_objs:
            r = download(url_obj["url"])
            extract(r, url_obj["csv"], output)

