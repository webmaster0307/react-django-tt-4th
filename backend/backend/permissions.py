from rest_framework.permissions import BasePermission, SAFE_METHODS
from backend.models import MyUser

class AdminOnly(BasePermission):
  def has_permission(self, request, view):
    try:
      return request.user.role == 1 # Adminatrator
    except:
      return False

class ReadOnly(BasePermission):
  def has_permission(self, request, view):
    print("----------", request.method)
    return request.method in SAFE_METHODS

class AllowPost(BasePermission):
  def has_permission(self, request, view):
    return request.method == 'POST'

class EnquiryPermission(BasePermission):
  def has_permission(self, request, view):
    try:
      if request.method == 'POST':
        return True
      elif request.method in SAFE_METHODS:
        return True
      else:
        request.user.role == 1
    except:
      return False