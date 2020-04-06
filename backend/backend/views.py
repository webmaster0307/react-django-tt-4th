from rest_framework import routers, serializers, viewsets, generics
from rest_framework.decorators import action
from backend.models import MyUser, Category, SubCategory, Enquirery, ADMIN_USER, REGULAR_USER
from backend.serializers import PasswordSerializer, SignupSerializer, CategorySerializer, SubCategoryRetrieveSerializer, \
    SubCategoryUpdateSerializer, MyUserRetrieveSerializer, ChangeOwnPasswordSerializer, \
   MyUserUpdateSerializer, MyUserDetailSerializer, EnquirerySerializer, EnquireryCreateSerializer
from backend.permissions import AdminOnly, ReadOnly, AllowPost, EnquiryPermission
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.decorators import api_view

from  django.contrib.auth.password_validation import validate_password

class CategoryViewSet(viewsets.ModelViewSet):
  permission_classes = [AdminOnly | ReadOnly]
  queryset =  Category.objects.all()
  serializer_class = CategorySerializer
  pagination_class = None

class SubCategoryViewSet(viewsets.ModelViewSet):
  permission_classes = [AdminOnly | ReadOnly]
  pagination_class = None
  def get_serializer_class(self):
    if self.action == 'list':
      return SubCategoryRetrieveSerializer
    else:
      return SubCategoryUpdateSerializer

  queryset =  SubCategory.objects.all()


class MyUserViewSet(viewsets.ModelViewSet):
  permission_classes = [AdminOnly|ReadOnly]
  queryset = MyUser.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['sub_category', 'category', 'role']
  search_fields = ['first_name', 'last_name', 'email', 'country', 'city']

  def get_queryset(self):
    try:
      if self.request.user.role == ADMIN_USER:
        return MyUser.objects.all()
    except Exception as e:
      print(e)
    return MyUser.objects.filter(role=REGULAR_USER)

  def get_serializer_class(self):
    if self.action == 'list':
      return MyUserRetrieveSerializer
    elif self.action == 'retrieve':
      return MyUserDetailSerializer
    elif self.action == 'set_password':
      return PasswordSerializer
    else:
      return MyUserUpdateSerializer
  
  @action(detail=True, methods=['post'])
  def set_password(self, request, pk=None):
    user = self.get_object()
    serializer_class = self.get_serializer_class()
    serializer = serializer_class(data=request.data)
    if serializer.is_valid(raise_exception=True):
      user.set_password(serializer.data['password'])
      user.save()
      return Response({'status': 'password set'})
    else:
      return Response(serializer.errors,
        status=status.HTTP_400_BAD_REQUEST)




class SignupView(generics.CreateAPIView):
  serializer_class = SignupSerializer
  permission_classes = [AllowAny,]


class EnquireryViewSet(viewsets.ModelViewSet):
  permission_classes = [EnquiryPermission, ]
  pagination_class = None
  queryset = Enquirery.objects.all()
  serializer_class = EnquirerySerializer

  def get_serializer_class(self):
    if self.action == 'create':
      return EnquireryCreateSerializer
    else:
      return EnquirerySerializer

@api_view(['GET', 'PATCH', 'PUT'])
def profile(request):
  if request.method == 'GET':
    serializer = MyUserDetailSerializer(request.user)
    return Response(serializer.data)
  if request.method == 'PATCH':
    instance = request.user
    serializer = MyUserUpdateSerializer(instance, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def change_password(request):
  user = request.user
  serializer = ChangeOwnPasswordSerializer(data=request.data)
  if serializer.is_valid(raise_exception=True):
    if request.user.check_password(serializer.data['oldPassword']):
      user.set_password(serializer.data['newPassword'])
      user.save()
      return Response({'status': 'password set'}) 
    else:
      return Response(serializer.errors,
        status=status.HTTP_400_BAD_REQUEST)


