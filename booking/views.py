from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Coach, Available, Booking, User
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import viewsets
from .serializers import BookingSerializer, AvailableSerializer, CoachSerializer, UserSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from dateutil.relativedelta import relativedelta
from datetime import date, time, datetime, timedelta
from .forms import AvailableForm, BookingForm, BookCoach
from django.contrib import messages
from django.db.models import Exists
from rest_framework.permissions import IsAuthenticated

class BookingViewSet(viewsets.ModelViewSet):
    """
    API endpoint  allows users to be viewed or edited.
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

class AvailableViewSet(viewsets.ModelViewSet):
    """
    API endpoint  allows groups to be viewed or edited.
    """
    queryset = Available.objects.all()
    serializer_class = AvailableSerializer
    permission_classes = [IsAuthenticated]


class CoachViewSet(viewsets.ModelViewSet):
    """
    API endpoint  allows groups to be viewed or edited.
    """
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer
    permission_classes = [IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint  allows groups to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


def index(request): 

    if not request.user.is_authenticated:
        return redirect('login')
    

    try:
        coach=Coach.objects.get(coach=request.user)
    except Coach.DoesNotExist:
        coach = False

    args = {'coach': coach }

    return render(request, "booking/index.html", args)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "booking/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "booking/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "booking/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "booking/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "booking/register.html")


def coachavails(request, coach):

    client = request.user

    try:
        avails = Available.objects.filter(coach=coach)
    except Available.DoesNotExist:
        return JsonResponse({"error": "Avails not found."}, status=404)

    args = {'avails': avails, 'client': client }

    for i in avails:
        print(i.date_available)
    
    return render(request, "booking/available.html", args)

def upcomingbookings(request):
    try:
        coach=Coach.objects.get(coach=request.user)
        bookings = Booking.objects.filter(coach_booked=coach)
    except Booking.DoesNotExist:
        bookings = False
    
    args = {'bookings': bookings, 'coach':coach }
    return render(request, "booking/upcomingbookings.html", args)


def manageschedules(request):

    if request.method == "POST":

        form = AvailableForm(request.POST)

        if form.is_valid():

            coach=Coach.objects.get(coach=request.user)

            if coach:    
                date_available = request.POST.get("date_available")
                available_until = request.POST.get("available_until")
                start_time = request.POST.get("start_time")
                end_time = request.POST.get("end_time")
                newschedule = Available.objects.create(coach=coach, date_available=date_available, available_until=available_until, start_time=start_time, end_time=end_time)
                newschedule.save()

                form = AvailableForm()

                return redirect('manageschedules') 
            else: 
                messages.error(request, "You cannot create a schedule, you are not a coach")

        else:
            form = AvailableForm(request.POST)

    else:
            form = AvailableForm()


    # show available schedules

    try:
        coach=Coach.objects.get(coach=request.user)
        avails = Available.objects.filter(coach=coach)

    except Available.DoesNotExist:
        avails = False

    try:
        coach=Coach.objects.get(coach=request.user)
    except Coach.DoesNotExist:
        coach = False

    
    args = {'form': form, 'avails': avails, 'coach': coach }

    return render(request, "booking/manageschedules.html", args)


def createbooking(request):

    if not request.user.is_authenticated:
        return redirect('login')
    
    client = request.user

    form = BookingForm()

    if request.method == "POST":

        form = BookingForm(request.POST)

        print(form.data)

        if form.is_valid():

            print("Form is valid")

            client = request.user
            date_booking_string = request.POST.get("date_booking")
            start_booking_string = request.POST.get("start_booking")
            datetime_booking_string = date_booking_string +' '+ start_booking_string
            
            print(datetime_booking_string)

            datetime_booking = datetime.strptime(datetime_booking_string, '%Y-%m-%d %H:%M')
            date_booking = datetime_booking.date()
            start_booking = datetime_booking.time()
            duration = timedelta(hours=1)
            end_booking = (datetime_booking + duration).time()
            
            
            print(f"this is the value of end_booking: {end_booking}")


            print(f"this is the end of the booking! {end_booking}")
           
            coach_booked_clean = form.cleaned_data["coach_booked"]

            print(coach_booked_clean)

            booking_exists = Booking.objects.filter(coach_booked=coach_booked_clean, date_booking=date_booking, start_booking=start_booking).exists()
            
            print(booking_exists)
            
            print(start_booking)
            print(end_booking)

            #print(coach_booked_instance)
            
            if booking_exists is False:
                # if there is no booking at that time, check if there is a schedule within that timeframe
                coach_schedules = Available.objects.filter(coach=coach_booked_clean, date_available__lte=date_booking, available_until__gte=date_booking, start_time__lte=start_booking, end_time__gte=end_booking).exists()
                
                print(f"coach_schedules is True or False?: {coach_schedules}")

                if coach_schedules is True:
                    print("There is availability in the schedule so let's create a booking")
                    
                    Booking.objects.create(client=client, coach_booked=coach_booked_clean, date_booking=date_booking, start_booking=start_booking, end_booking=end_booking)
                    messages.success(request, f"Great {client}, you are scheduled for a coaching session with {coach_booked_clean} on {date_booking} at {start_booking}, make sure you write it down in your calendar :)")
                        
                else: 
                    messages.error(request, f"Hi {client}, apologies but instant booking is not available for coach {coach_booked_clean} on {date_booking} at {start_booking}, feel free to try another day/time that suits you or message coach {coach_booked_clean}")

            else:
                messages.error(request, f"Hi {client}, apologies but coach {coach_booked_clean} is seeing another client on {date_booking} at {start_booking}, feel free to try another day/time that suits you or message coach {coach_booked_clean}")
    
        else:
            form = BookingForm()

    else: 
        form = BookingForm()

    try:
        coach=Coach.objects.get(coach=request.user)
    except Coach.DoesNotExist:
        coach = False

    args = {'form': form, 'client':client }

    return render(request, "booking/coachdetail.html", args)


def coaches(request):

    if not request.user.is_authenticated:
        return redirect('login')

    client = request.user 
   
    try:
        coaches=Coach.objects.all()
            
    except Coach.DoesNotExist:
        coaches=False
        messages.error(request, f"Sorry {client}, but we don't have any active coaches at this time")
    

    args = {'coaches': coaches, 'client':client}


    return render(request, "booking/coaches.html", args)


def bookcoach(request, coach):
    client = request.user

    form = BookCoach()

    if request.method == 'POST':
        print(request)
        form = BookCoach(request.POST)
        print(form.data)
        if form.is_valid():
            client= request.user

    else:
        form = BookCoach()


    args = {'form': form, 'client':client}

    return render(request, "booking/coachdetail.html", args)


def coachdetail(request, coach):

    coach=Coach.objects.get(id=coach)
    client = request.user

    form = BookCoach()

    if request.method == 'POST':
        print(request)
        form = BookCoach(request.POST)
        print(form.data)

        if form.is_valid():

            date_booking_string = request.POST.get("date_booking")
            start_booking_string = request.POST.get("start_booking")
            datetime_booking_string = date_booking_string +' '+ start_booking_string

            datetime_booking = datetime.strptime(datetime_booking_string, '%Y-%m-%d %H:%M')
            date_booking = datetime_booking.date()
            start_booking = datetime_booking.time()
            duration = timedelta(hours=1)
            end_booking = (datetime_booking + duration).time()

            booking_exists = Booking.objects.filter(coach_booked=coach, date_booking=date_booking, start_booking=start_booking).exists()

            if booking_exists is False:
                # if there is no booking at that time, check if there is a schedule within that timeframe
                coach_schedules = Available.objects.filter(coach=coach, date_available__lte=date_booking, available_until__gte=date_booking, start_time__lte=start_booking, end_time__gte=end_booking).exists()   
                print(f"coach_schedules is True or False?: {coach_schedules}")

                if coach_schedules is True:
                    print("There is availability in the schedule so let's create a booking")
                    
                    Booking.objects.create(client=client, coach_booked=coach, date_booking=date_booking, start_booking=start_booking, end_booking=end_booking)
                    messages.success(request, f"Great {client}, you are scheduled for a coaching session with {coach} on {date_booking} at {start_booking}, make sure you write it down in your calendar :)")
                        
                else: 
                    messages.error(request, f"Hi {client}, apologies but instant booking is not available for coach {coach} on {date_booking} at {start_booking}, feel free to try another day/time that suits you or message coach {coach}")
            else:
                messages.error(request, f"Hi {client}, apologies but coach {coach} is seeing another client on {date_booking} at {start_booking}, feel free to try another day/time that suits you or message coach {coach}")
            
        else:
            form = BookCoach()
    
    coachname = coach


    args = {'form': form, 'client':client, 'coachname': coachname }

    return render(request, "booking/coachdetail.html", args)



def mybookings(request):
    try:
        client=request.user
        bookings = Booking.objects.filter(client=client)
    except Booking.DoesNotExist:
        bookings = False
    
    args = {'bookings': bookings, 'client':client }
    return render(request, "booking/mybookings.html", args)


        



        
        
    # create a new date available.




# def allsundays(year):
#    d = date(year, 1, 1)                    # January 1st
#    d += timedelta(days = 6 - d.weekday())  # First Sunday
#    while d.year == year:
#       yield d
#       d += timedelta(days = 7)

# for d in allsundays(2010):
#    print(d)
    

    