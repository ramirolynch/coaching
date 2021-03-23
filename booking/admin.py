from django.contrib import admin
from .models import Booking, Available, Coach, User

# Register your models here.

admin.site.register(Booking)
admin.site.register(Available)
admin.site.register(Coach)
admin.site.register(User)