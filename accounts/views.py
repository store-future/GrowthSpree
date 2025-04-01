from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from accounts.serializers import UserLoginSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache  # Used to store tokens temporarily
from rest_framework_simplejwt.exceptions import TokenError
from django.utils.timezone import now



def get_tokens_for_user(user):    
    existing_refresh = cache.get(f"user_refresh_{user.id}")
    existing_access = cache.get(f"user_access_{user.id}")
    # print(f"existing_refresh: {existing_refresh}, \nexisting_access: {existing_access}")

    try:
        if existing_refresh:
            refresh = RefreshToken(existing_refresh)
            print(refresh)
            if refresh["exp"] > now().timestamp():
                if existing_access:
                    access = AccessToken(existing_access)
                    if access["exp"] > now().timestamp():
                        return {'refresh': str(refresh), 'access': str(access)}

                access = refresh.access_token
                cache.set(f"user_access_{user.id}", str(access), timeout=300)  
                return {'refresh': str(refresh), 'access': str(access)}

    except (TokenError, TypeError, KeyError):
        pass

    refresh = RefreshToken.for_user(user)
    access = refresh.access_token

    cache.set(f"user_refresh_{user.id}", str(refresh), timeout=1200)  
    cache.set(f"user_access_{user.id}", str(access), timeout=600)  

    return {'refresh': str(refresh), 'access': str(access)}
  
  
class UserRegistrationView(APIView):

  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    
    serializer.is_valid(raise_exception=True) 
    user = serializer.save()
    token = get_tokens_for_user(user)
    return Response({'token':token, 'message':'Registration Successful'}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):

  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token, 'message':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':'Email or Password is not Valid'}, status=status.HTTP_404_NOT_FOUND)



