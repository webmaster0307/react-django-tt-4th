from rest_framework import routers, serializers, viewsets
from backend.models import MyUser, Category, SubCategory, Enquirery
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ['id', 'name']

class SubCategorySimpleSerializer(serializers.ModelSerializer):

  class Meta:
    model = SubCategory
    fields = ['id', 'name',]

class SubCategoryRetrieveSerializer(serializers.ModelSerializer):
  category = CategorySerializer(many=False)

  class Meta:
    model = SubCategory
    fields = ['id', 'name', 'category']

class SubCategoryUpdateSerializer(serializers.ModelSerializer):
  category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)

  class Meta:
    model = SubCategory
    fields = ['id', 'name', 'category']


class EnquirerySerializer(serializers.ModelSerializer):

  class Meta:
    model = Enquirery
    fields = ['id', 'content']

class EnquireryCreateSerializer(serializers.ModelSerializer):

  class Meta:
    model = Enquirery
    fields = ['id', 'content', 'owner']

  def create(self, validated_data):
    enquiry = Enquirery.objects.create(**validated_data)
    send_mail(
        'A client sent you a message via toptal',
        enquiry.content,
        settings.EMAIL_HOST_USER,
        [enquiry.owner.email],
        fail_silently=False,
    )
    return enquiry

class MyUserRetrieveSerializer(serializers.ModelSerializer):
  sub_category = SubCategorySimpleSerializer(many=False)
  category = CategorySerializer(many=False)

  class Meta:
    model = MyUser
    fields = ['id', 'email', 'first_name', 'last_name', 'country', 'city', 'role', 'category', 'sub_category']

class MyUserDetailSerializer(serializers.ModelSerializer):
  sub_category = SubCategorySimpleSerializer(many=False)
  category = CategorySerializer(many=False)
  enquiries = EnquirerySerializer(many=True, read_only=True)
  class Meta:
    model = MyUser
    fields = ['id', 'email', 'first_name', 'last_name', 'country', 'city', 'role', 'category', 'sub_category', 'enquiries']

class MyUserUpdateSerializer(serializers.ModelSerializer):
  # sub_category = SubCategorySimpleSerializer(many=False)
  # category = CategorySerializer(many=False)

  class Meta:
    model = MyUser
    fields = ['id', 'email', 'first_name', 'password', 'last_name', 'role', 'country', 'city', 'category', 'sub_category']
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = MyUser(**validated_data)
    user.set_password(validated_data['password'])
    user.save()
    return user
  
  def to_representation(self, instance):
    serializer = MyUserRetrieveSerializer(instance)
    return serializer.data

class SignupSerializer(MyUserUpdateSerializer):

  class Meta:
    model = MyUser
    fields = ['id', 'email', 'password', 'first_name', 'last_name', 'country', 'city', 'category', 'sub_category']
    extra_kwargs = {'password': {'write_only': True}}

class PasswordSerializer(serializers.Serializer):
  password = serializers.CharField(min_length=8, allow_blank=False)

  class Meta:
    fields = ['password', ]

class ChangeOwnPasswordSerializer(serializers.Serializer):
  oldPassword = serializers.CharField(min_length=8, allow_blank=False)
  newPassword = serializers.CharField(min_length=8, allow_blank=False)

  class Meta:
    fields = ['oldPassword', 'newPassword']