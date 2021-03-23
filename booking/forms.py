from django import forms
from .models import Available, Booking, Coach

class AvailableForm(forms.Form):
    date_available = forms.DateField(required=True, widget=forms.DateTimeInput(attrs={'type': 'date'}))
    available_until = forms.DateField(required= True, widget=forms.DateTimeInput(attrs={'type': 'date'}))
    start_time = forms.TimeField(required=False, widget=forms.TimeInput(attrs={'type': 'time'}))
    end_time = forms.TimeField(required=False, widget=forms.TimeInput(attrs={'type': 'time'}))


class BookingForm(forms.Form):
    coach_booked = forms.ModelChoiceField(queryset=None) 
    date_booking = forms.DateField(required=True, widget=forms.DateTimeInput(attrs={'type': 'date'}))
    start_booking = forms.TimeField(required=True, widget=forms.TimeInput(attrs={'type': 'time'}))

    def __init__(self, *args, **kwargs):
        super(BookingForm, self).__init__(*args, **kwargs)
        self.fields['coach_booked'].queryset=Coach.objects.all()
        

class BookCoach(forms.Form):
    date_booking = forms.DateField(required=True, widget=forms.DateTimeInput(attrs={'type': 'date'}))
    start_booking = forms.TimeField(required=True, widget=forms.TimeInput(attrs={'type': 'time'}))





       
    

    

     
    
   
