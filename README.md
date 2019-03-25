# MBTA

## Dev Setup

```
docker-compose up
docker exec mbta_api_1 ./manage.py migrate
```

## Data Scripts

All these commands are run from within `api/`:

```
bin/download.py  # Download CSVs, according to data/urls.json
bin/gen_stations.py -c data/gated_station_entries_2013.csv  # Generate data/stations.json
./manage.py insertstations  # Add stations to the DB
./manage.py insertdata  # Add CSV data to the DB
```
