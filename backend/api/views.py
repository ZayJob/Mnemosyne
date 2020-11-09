from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.shortcuts import redirect
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


from .tokens import account_activation_token


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect(f"http://localhost:3001/activate/{uidb64}/{token}")
    else:
        return redirect(f"http://localhost:3001/activate/{uidb64}/{token}")