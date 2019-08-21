#!/bin/sh

echo "Reading DB password from $MBTA_DB_PASSWORD_FILE"
export MBTA_DB_PASSWORD=$(cat $MBTA_DB_PASSWORD_FILE)
echo "Reading secret key from $MBTA_SECRET_KEY_FILE"
export MBTA_SECRET_KEY=$(cat $MBTA_SECRET_KEY_FILE)
dockerize -wait tcp://${MBTA_DB_HOST}:5432
./manage.py migrate
gunicorn mbta.wsgi -b :8000 \
    --log-file /var/log/gunicorn/gunicorn.log \
    --access-logfile /var/log/gunicorn/gunicorn_access.log
