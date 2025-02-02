import json
import logging
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser  # Import the custom user model

# Set up logging
logger = logging.getLogger(__name__)


# Home Route (Test)
def home(request):
    print("Redirecting to register page...")
   # return redirect('http://localhost:3000/login')
    return JsonResponse({"message": "hello"})

# CSRF Token Endpoint (for frontend security)
def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})


# Route for user registration
@csrf_exempt  # Exempt CSRF protection for testing purposes
def register(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            # Validate input fields
            if not (name and email and password):
                return JsonResponse({"message": "All fields are required"}, status=400)

            # Check if the email is already registered
            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({"message": "User already registered"}, status=409)

            # Create a new user
            user = CustomUser.objects.create_user(username=email, email=email, password=password, name=name)
            user.save()
            return JsonResponse({"message": "Registration successful"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format"}, status=400)
        except Exception as e:
            logger.error(f"Error during registration: {str(e)}")
            return JsonResponse({"message": "An error occurred during registration"}, status=500)

    return JsonResponse({"message": "Invalid request method"}, status=400)


# Route for user login
@csrf_exempt  # Exempt CSRF protection for testing purposes
def login(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Authenticate user with email and password
            user = authenticate(username=email, password=password)
            if user is not None:
                return JsonResponse({"message": "Login successful!"}, status=200)
            else:
                return JsonResponse({"message": "Invalid credentials!"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format"}, status=400)
        except Exception as e:
            logger.error(f"Error during login: {str(e)}")
            return JsonResponse({"message": "An error occurred during login"}, status=500)

    return JsonResponse({"message": "Invalid request method"}, status=400)
