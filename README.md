# MBTA

## Dev Setup

```
docker-compose up
docker exec mbta_api_1 ./manage.py migrate
```

## Data Scripts

All are run from within From within `api/`

### Downloading data

The files to download are specified in `data/urls.json`.

```
bin/download.py
```

### Loading Stations

This should already be done, but if you need to re-load station data, you need to download at least one CSV first, then run:

```
bin/gen_stations.py -c data/gated_station_entries_2013.csv
```

Then you'll have to manually insert the line names
