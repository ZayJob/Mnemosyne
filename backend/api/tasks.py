from backend.celery import app

from django.template import Template, Context
from django.core.mail import send_mass_mail
from api.models import Prompt
from django.conf import settings

from django.utils import timezone


REPORT_TEMPLATE = """
{{ description }}
"""

@app.task
def sending_reminder_to_email():
    template = Template(REPORT_TEMPLATE)
    messages = []

    for prompt in Prompt.objects.filter(done_date_time=timezone.now().replace(second=0, microsecond=0)):
        added_users = [user.email for user in prompt.added_users.all()]
        if prompt.creater.username not in added_users:
            added_users.append(prompt.creater.username)

        messages.append((
            f'{prompt.title}',
            template.render(context=Context({'description': prompt.description})),
            settings.EMAIL_HOST_USER,
            added_users
        ))

        prompt.complited=True
        prompt.save()

    send_mass_mail(tuple(messages), fail_silently=False)
