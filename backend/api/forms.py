import unicodedata

from django import forms
from django.contrib.auth import password_validation
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.translation import gettext, gettext_lazy as _

from api.models import User
from api.tasks import send_mail_verification_email_task


class UsernameField(forms.CharField):
    def to_python(self, value):
        return unicodedata.normalize('NFKC', super().to_python(value))

    def widget_attrs(self, widget):
        return {
            **super().widget_attrs(widget),
            'autocapitalize': 'none',
            'autocomplete': 'username',
        }

    def validate(self, value):
        # Username should not match email pattern
        try:
            validate_email(value)
        except ValidationError:
            return
        else:
            raise ValidationError('Username should not match email pattern')


class UserCreationForm(forms.ModelForm):
    """
    A form that creates a user, with no privileges, from the given username and
    password.
    """
    error_messages = {
        'password_mismatch': _('The two password fields didn’t match.'),
    }
    password1 = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        label=_("Password confirmation"),
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        strip=False,
        help_text=_("Enter the same password as before, for verification."),
    )
    email = forms.CharField(
        label=_("Email"),
        strip=True,
        validators=[validate_email]
    )
    fullname = forms.CharField(
        label=_("Full name"),
        strip=True
    )
    organization = forms.CharField(
        label=_("Organization"),
        strip=True,
        required=False
    )

    class Meta:
        model = User
        fields = ("username", 'first_name', 'last_name', 'email', 'organization')
        field_classes = {'username': UsernameField}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self._meta.model.USERNAME_FIELD in self.fields:
            self.fields[self._meta.model.USERNAME_FIELD].widget.attrs['autofocus'] = True

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def clean(self):
        data = super().clean()
        names = data.get('fullname', "").split(' ', 1)
        data['first_name'] = names[0]
        data['last_name'] = names[1] if len(names) > 1 else ''
        if 'fullname' in data:
            del data['fullname']
        return data

    def _post_clean(self):
        super()._post_clean()
        # Validate the password after self.instance is updated with form data
        # by super().
        password = self.cleaned_data.get('password2')
        if password:
            try:
                password_validation.validate_password(password, self.instance)
            except forms.ValidationError as error:
                self.add_error('password2', error)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        send_mail_verification_email_task.delay(user)
        return user
