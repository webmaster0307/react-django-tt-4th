"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework import routers, serializers, viewsets

from backend.views import CategoryViewSet, SubCategoryViewSet, MyUserViewSet, SignupView, EnquireryViewSet, profile, change_password

router = routers.DefaultRouter()
router.register('category', CategoryViewSet)
router.register('sub-category', SubCategoryViewSet)
router.register('users', MyUserViewSet)
router.register('enquiries', EnquireryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/signup/', SignupView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pai'),            # get token for simplejwt
    path('api/refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),           # refresh token for simple jwt
    path('api/verify-token/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/profile/', profile),
    path('api/change-password/', change_password)
]
