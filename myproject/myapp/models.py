from django.contrib.auth.models import AbstractUser
from django.db import models

# Custom user model extending the built-in AbstractUser
class CustomUser(AbstractUser):
    name = models.CharField(max_length=255, null=True, blank=True)

    # You don't need to manually hash passwords, Django does this automatically
    def set_password(self, password):
        super().set_password(password)  # This will handle password hashing

    def check_password(self, password):
        return super().check_password(password)  # This will verify the password correctly

    def __repr__(self):
        return f"<CustomUser {self.username}>"
