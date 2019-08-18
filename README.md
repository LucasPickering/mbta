# MBTA

Data visualizations of history MBTA data. Created for a project in INSH 2102 at Northeastern University.

## Dev Setup

```sh
docker-compose up
docker exec -it mbta_api_1 sh
./manage.py migrate
```

## Data Scripts

To load in more data, you'll have to download the new data then load it into the DB. All these commands are run from within `api/`:

```sh
./manage.py download  # Download CSVs, according to data/urls.json
./manage.py genstations -c data/gated_station_entries_2013.csv  # Generate data/stations.json
./manage.py insertstations  # Add stations to the DB
./manage.py insertdata data/*.csv  # Add CSV data to the DB (takes a long time)
```

## Deployment

### Building & Pushing Images

Deployed via [Keskne](https://github.com/LucasPickering/keskne).

```sh
docker login
./build_push.sh
```

### Running

After Keskne brings the contains up for the first time, you'll have manually execute the scripts above (except `genstations`) to load data into the API.
