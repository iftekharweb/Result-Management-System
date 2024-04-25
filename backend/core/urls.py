from django.urls import path, include
from .views import UserRegistrationView, UserLogInView, UserProfileView, UserChangePasswordView, SendPasswordResetEmailView, UserPasswordResetView, get_user_id_by_email

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLogInView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', UserChangePasswordView.as_view(), name='change-password'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('userid/', get_user_id_by_email, name='user-id'),
]