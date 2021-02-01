from backend.celery import app

from api.mail import send_email_activation_mail


@app.task
def send_mail_verification_email_task(user_fullname, user_email, token):
    send_email_activation_mail(
        user_fullname, user_email, token
    )
