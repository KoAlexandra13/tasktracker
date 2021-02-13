FROM python:3.8-alpine
WORKDIR /backend

RUN apk add --no-cache postgresql-dev build-base postgresql-client linux-headers zlib-dev jpeg-dev libjpeg
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000
