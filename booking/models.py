from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import datetime
import calendar

class User(AbstractUser):
    pass

class Booking(models.Model):
    coach_booked = models.ForeignKey('Coach', on_delete=models.CASCADE, blank=True, null=True)
    client = models.ForeignKey('User', on_delete=models.CASCADE, blank=True, null=True)
    date_booking = models.DateField(null=True, blank=True)
    start_booking = models.TimeField(null=True, blank=True)
    end_booking = models.TimeField(null=True, blank=True)
    duration_booking = models.IntegerField(null=True, blank=True)

    confirmed = models.BooleanField(default=False)

    TIME_SLOT = [
        (1, '9 AM'),
        (2, '10 AM'),
        (3, '11 AM'),
        (4, '12 NOON'),
        (5, '1 PM'),
        (6, '2 PM'),
        (7, '3 PM'),
        (8, '4 PM'),
        (9, '5 PM'),
        (10, '6 PM'),
    ]

    time_slot_code = models.OneToOneField('Available',
    on_delete=models.CASCADE, related_name='requested_slot', null=True
    )
    
    class Meta:
        ordering = ('-date_booking','-start_booking')

    def __str__(self):
        return f'Booking made by {self.client}'


class Available(models.Model):
    coach = models.ForeignKey('Coach', on_delete=models.CASCADE, blank=True, null=True)
    date_available = models.DateField(null=True, blank=True)
    available_until = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    duration_minutes = models.IntegerField(null=True, blank=True)
    DAY_CHOICES = tuple(enumerate(calendar.day_name))
    taken = models.BooleanField(default=False)


class Coach(models.Model):
    coach = models.OneToOneField('User', on_delete=models.CASCADE, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='images/', blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f'{self.coach}'

