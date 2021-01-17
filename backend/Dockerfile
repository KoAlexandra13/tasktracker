FROM python:3.8-slim
RUN apt-get update && apt-get install -y libpq-dev gcc
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
COPY . /backend/
