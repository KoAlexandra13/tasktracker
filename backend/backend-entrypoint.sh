#!/bin/sh


./wait-for-db.sh db
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
