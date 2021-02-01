from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template


def send_email_activation_mail(user_fullname, user_email, token):
    mail_from = settings.DEFAULT_FROM_EMAIL
    frontend_url = settings.FRONTEND_EXTERNAL_URL

    plaintext = get_template('email/email_verification.txt')
    html_template = get_template('email/email_verification.html')

    data = {
        'username': user_fullname,
        'link': f'{frontend_url}/email-activate?token={token}'
    }
    text_content = plaintext.render(data)
    html_content = html_template.render(data)

    msg = EmailMultiAlternatives(
        'Treckero. Email Address Verification.',
        text_content,
        mail_from,
        [user_email]
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
