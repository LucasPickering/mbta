# MBTA

## Dev Setup

```
docker-compose up
docker exec mbta_api_1 ./manage.py migrate
```

## Data Scripts

All these commands are run from within `api/`:

```
./manage.py download  # Download CSVs, according to data/urls.json
./manage.py genstations -c data/gated_station_entries_2013.csv  # Generate data/stations.json
./manage.py insertstations  # Add stations to the DB
./manage.py insertdata data/*.csv  # Add CSV data to the DB (takes a long time)
```

## Deployment

### Building & Pushing Images

Deployed via [Keskne](https://github.com/LucasPickering/keskne).

```
docker login
docker-compose -f docker-compose.build.yml build --pull
docker-compose -f docker-compose.build.yml push
```
