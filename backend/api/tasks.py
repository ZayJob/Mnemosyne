"""File to celery tasks."""

from django.template import Template, Context
from django.core.mail import send_mass_mail
from django.conf import settings
from django.utils import timezone

from backend.celery import app

from api.models import Prompt


REPORT_TEMPLATE = """
{{ description }}
"""

@app.task
def sending_reminder_to_email() -> None:
    """
    This method is performed every minute and checks the execution time,
    if triggered, it gets all the people added to this reminder,
    checks whether the creator has been added to this list, if not,
    then adds it, and sends a reminder to everyone.
    And changes the status of the reminder to done.
    """
    template = Template(REPORT_TEMPLATE)
    messages = []

    for prompt in Prompt.objects.filter(done_date_time=timezone.now().replace(second=0, microsecond=0)):
        added_users = [user.email for user in prompt.added_users.all()]
        if prompt.creater.email not in added_users:
            added_users.append(prompt.creater.email)

        messages.append((
            f'{prompt.title}',
            template.render(context=Context({'description': prompt.description})),
            settings.EMAIL_HOST_USER,
            added_users
        ))
        
        try:
            prompt.complited = True
            prompt.save()
        except Exception as ex:
            print(f"Not save prompt {ex}")

    send_mass_mail(tuple(messages), fail_silently=False)
