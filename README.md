# Mnemosyne
## Reminder service
---


# Install

For install project use this:
```
git clone https://github.com/ZayJob/Mnemosyne.git

cd Mnemosyne

touch .env.dev

sudo docker-compose up -d --build
sudo docker ps -a
```

Virtual environment variables for .env.dev file:
```
DEBUG=1
SECRET_KEY=
DJANGO_ALLOWED_HOSTS=localhost 0.0.0.0 127.0.0.1 [::1]

SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=hello_django_dev
SQL_USER=hello_django
SQL_PASSWORD=hello_django
SQL_HOST=db
SQL_PORT=5432
DATABASE=postgres

DROPBOX_APP_KEY=
DROPBOX_APP_SECRET_KEY=
DROPBOX_OAUTH2_TOKEN=
DROPBOX_ROOT_PATH=/media/

EMAIL_USE_TLS=True
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_PORT=587
```

For removed docer-compose containers use this:
```
sudo docker-compose down -v
```
And check:
```
sudo docker images
```
For removed images use this:
```
sudo docker systems pruno
```
---
# Technology stack

+ Django

+ Django-rest-framework

+ PostgreSQL

+ Redis

+ Docker

+ ReactJS

+ Celery

+ Dropbox storages

+ Redux
---
# Functional requirements:

+ User registration + profile

+ Create, change and delete reminders

+ Linking participants (from the same system)

+ Email notification to participants and creator

+ Be able to mark a task completed