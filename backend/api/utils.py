from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template


def send_email_activation_mail(user):
    mail_from = settings.DEFAULT_FROM_EMAIL

    plaintext = get_template('email/email_verification.txt')
    html_template = get_template('email/email_verification.html')

    data = {
        'username': user.fullname,
        'link': 'asd'
    }
    text_content = plaintext.render(data)
    html_content = html_template.render(data)

    msg = EmailMultiAlternatives(
        'Treckero. Email Address Verification.',
        text_content,
        mail_from,
        [user.email]
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
