# Mnemosyne
## Reminder service
---


# Install

For install project use this:
```
git clone https://github.com/ZayJob/Mnemosyne.git

cd Mnemosyne

sudo docker-compose up -d --build
sudo docker ps -a
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