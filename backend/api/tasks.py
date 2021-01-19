from backend.celery import app

from api.utils import send_email_activation_mail


@app.task
def send_mail_verification_email_task(user):
    send_email_activation_mail(user)
