#!/bin/sh


./wait-for-db.sh db
celery -A backend worker --loglevel=INFO
