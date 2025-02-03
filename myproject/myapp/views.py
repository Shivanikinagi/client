# views.py

import json
import logging
from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser

logger = logging.getLogger(__name__)

# CSRF Token Endpoint
def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})

# Home Route
def home(request):
    return JsonResponse({"message": "Welcome to the 3D Model Generator API!"})

# Register Route
# views.py (login view)
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            logger.info(f"Login attempt: {email}")

            if not email or not password:
                logger.error("Missing email/password during login")
                return JsonResponse({"message": "Both email and password are required"}, status=400)

            user = authenticate(request, email=email, password=password)
            if user is not None:
                logger.info(f"User {email} logged in successfully")
                return JsonResponse({"message": "Login successful!"}, status=200)
            else:
                logger.error(f"Invalid credentials for {email}")
                return JsonResponse({"message": "Invalid credentials!"}, status=401)

        except Exception as e:
            logger.error(f"Login error: {str(e)}", exc_info=True)
            return JsonResponse({"message": "An error occurred during login"}, status=500)
# Login Route
# views.py (register view)
@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            logger.info(f"Registration attempt: {email}")

            if not (name and email and password):
                logger.error("Missing fields during registration")
                return JsonResponse({"message": "All fields are required"}, status=400)

            if CustomUser.objects.filter(email=email).exists():
                logger.error(f"User {email} already exists")
                return JsonResponse({"message": "User already registered"}, status=409)

            user = CustomUser.objects.create_user(email=email, password=password, name=name)
            user.save()
            logger.info(f"User {email} registered successfully")
            return JsonResponse({"message": "Registration successful"}, status=201)

        except Exception as e:
            logger.error(f"Registration error: {str(e)}", exc_info=True)
            return JsonResponse({"message": "An error occurred during registration"}, status=500)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({"message": "Logout successful!"}, status=200)
    return JsonResponse({"message": "Invalid request"}, status=400)
# Logout Route