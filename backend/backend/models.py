from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyUserManager(BaseUserManager):
  def create_user(self, email, password=None):
    """
    Creates and saves a User with the given email, date of
    birth and password.
    """
    if not email:
      raise ValueError('Users must have an email address')

    user = self.model(
      email=self.normalize_email(email),
    )

    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_superuser(self, email, password):
    """
    Creates and saves a superuser with the given email, date of
    birth and password.
    """
    user = self.create_user(
      email,
      password=password,
    )
    user.is_admin = True
    user.save(using=self._db)
    return user


class Category(models.Model):
  name = models.CharField(max_length=100, unique=True)
  def __str__(self):
    return self.name


class SubCategory(models.Model):
  name = models.CharField(max_length=100, unique=True)
  category = models.ForeignKey(Category, max_length=100, on_delete=models.CASCADE)

  def __str__(self):
    return self.name

ADMIN_USER = 1
REGULAR_USER = 2

class MyUser(AbstractBaseUser):

  ROLE_CHOICES = (
    (ADMIN_USER, 'Administrator'),
    (REGULAR_USER, 'Regular User'),
  )

  email = models.EmailField(unique=True)
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  country = models.CharField(max_length=100, default="")
  city = models.CharField(max_length=100, default="")
  category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
  sub_category = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True)
  role = models.IntegerField(choices=ROLE_CHOICES, default=REGULAR_USER, help_text="Account Type")

  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)

  is_superuser = models.BooleanField(
    default=False,
  )

  date_joined = models.DateField(auto_now_add=True)
  last_updated = models.DateField(auto_now=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  objects = MyUserManager()

  # def save(self, *args, **kwargs):
  #   self.category = self.sub_category.category
  #   super(MyUser, self).save(*args, **kwargs)

  def __str__(self):
    return f"{self.first_name} {self.last_name}"

  def has_perm(self, perm, obj=None):
    "Does the user have a specific permission?"
    # Simplest possible answer: Yes, always
    return True

  def has_module_perms(self, app_label):
    "Does the user have permissions to view the app `app_label`?"
    # Simplest possible answer: Yes, always
    return True

  @property
  def is_staff(self):
      "Is the user a member of staff?"
      # Simplest possible answer: All admins are staff
      return self.is_admin

  class Meta:
    verbose_name = "User"

class Enquirery(models.Model):
  content = models.TextField()
  owner = models.ForeignKey(MyUser, related_name="enquiries", on_delete=models.CASCADE)

  def __str__(self):
    return self.content[0:40]