#!/bin/sh

DB_TAG="lucaspickering/mbta-db:latest"

# Set up the DB with all the necessary data
docker-compose run api sh -c ' \
    dockerize -wait tcp://db:5432 \
    && ./manage.py migrate \
    && ./manage.py insertstations \
    && ./manage.py insertdata data/*.csv \
'

# Save the DB container as a new image
docker commit `docker-compose ps -q db` ${DB_TAG}
