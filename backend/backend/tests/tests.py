from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase

from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework import routers, serializers, viewsets, status

from backend.views import CategoryViewSet, SubCategoryViewSet, MyUserViewSet, SignupView, EnquireryViewSet, profile, change_password

router = routers.DefaultRouter()
router.register('category', CategoryViewSet)
router.register('sub-category', SubCategoryViewSet)
router.register('users', MyUserViewSet)
router.register('enquiries', EnquireryViewSet)


class StatusCodeTests(APITestCase, URLPatternsTestCase):
  urlpatterns = [
    path('api/', include(router.urls)),
    path('api/signup/', SignupView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pai'),            # get token for simplejwt
    path('api/refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),           # refresh token for simple jwt
    path('api/verify-token/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/profile/', profile),
    path('api/change-password/', change_password)
  ]


  def test_get_users(self):
    """
    Ensure we can get user list.
    """
    url = '/api/users/'
    response = self.client.get(url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_create_users(self):
    """
    Ensure we can get user list.
    """
    url = '/api/users/'
    response = self.client.post(url, format='json')
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

  def test_signup(self):
    """
    Ensure we can get user list.
    """
    url = '/api/signup/'
    response = self.client.post(url, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)