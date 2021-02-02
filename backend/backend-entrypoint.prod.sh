#!/bin/sh


./wait-for-db.sh db
python manage.py migrate
python manage.py collectstatic
gunicorn backend.wsgi:application --bind 0.0.0.0:8000