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

The production system pulls images down instead of building them itself. You'll have to build and push them locally. To push, you have to make a user on [Docker Hub](https://hub.docker.com/), get added to the `insh2102mbta` organization.

#### Database

The DB image can be built and pushed with:

```
docker login
prod/build_db.sh
docker push insh2102mbta/db:latest
```

This will take a while, but we only have to do it when we change models or get new data.

#### API & Webserver

```
docker login
docker-compose -f docker-compose.build.yml build
docker-compose -f docker-compose.build.yml push
```

### Deploying

On the deployment machine:

```
docker login
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```
