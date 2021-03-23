from .models import Booking, Available, Coach, User
from rest_framework import serializers

class BookingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class AvailableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Available
        fields = '__all__'

class CoachSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Coach
        fields = '__all__'

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
