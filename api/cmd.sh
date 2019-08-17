#!/bin/sh

dockerize -wait tcp://${MBTA_DB_HOST}:5432
./manage.py migrate
./manage.py download
./manage.py insertstations -e
./manage.py insertdata -e
gunicorn mbta.wsgi -b :8000 \
    --log-file /var/log/gunicorn/gunicorn.log \
    --access-logfile /var/log/gunicorn/gunicorn_access.log
