#!/usr/bin/env python3

import argparse
import io
import json
import os
import requests
import zipfile


def download(url):
    print(f"Downloading {url}...")
    r = requests.get(url)
    r.raise_for_status()
    return r


def extract(response, csv_name, output_dir):
    f = io.BytesIO(response.content)
    zf = zipfile.ZipFile(f)
    dest_path = os.path.join(output_dir, os.path.basename(csv_name))

    with zf.open(csv_name) as infile, open(dest_path, "wb") as outfile:
        outfile.write(infile.read())

    print(f"Extracted to {dest_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download data")
    parser.add_argument("--urls", "-u", default="data/urls.json")
    parser.add_argument("--output", "-o", default="data/")
    args = parser.parse_args()

    with open(args.urls) as f:
        url_objs = json.load(f)

    for url_obj in url_objs:
        r = download(url_obj["url"])
        extract(r, url_obj["csv"], args.output)
