# Coaching / Booking Project

## Overview
The goal of this application is to manage time slots for coaches and trainees. Coaches can create schedules that include a date when the schedule starts and a date when the schedule ends, as well as a start time and an end time. Users who are not coaches are able to book time with one of the coaches instantly (without the need for confirmation from the coach) if the time slot is available. If the time slot is not available, the user is presented with a message indicating the unavailability of the coach. Users can create, edit and delete bookings, coaches can edit or delete bookings. Only coaches can view, create, edit and delete schedules.

## Complexity
The complexity of this application lies in large part in the use of dates and time management. The user can book time with a coach if the booking date and time are within the timeframe stipulated by coaches in their schedules. If a spot on the same day at the same time is already taken, the user is not able to book. This is accomplished using django queryset filters such as "gte" which stands for "greater than or equal to" in order to determine if a date falls within a particular timeframe. This project uses the datetime object in python and in javascript. Portions of the code, especifically in views.py and book.js, deal with manipulating strings to create datetime objects. The html input tag with attributes date and time deals with the presentation of the date and time to the users. The complexity of this project has to do with the fact that none of these concepts involving dates and times has been covered in CS50 web lectures and date / time manipulation tends to be considered as one of the most difficult concepts to grasp in programming. This project has more lines of code in javascript (book.js) and more lines of code in the views.py file in the django project than in any of my other projects. Even though a larger number of lines of code doesn't necessarily mean higher complexity, the increased number of lines of code added with the fact that I had to learn how to deal with dates and how to create the logic for time management, I believe this project suffices in terms of higher complexity than previous projects.

## Distinctiveness 
None of the previous projects in CS50 Web dealt with time management. Also, none of the previous projects had two types of users, normal users (trainees) as well as coaches. This project includes all of the more complex aspects of previous projects such us the use of asynchronous "CRUD" operations using the javascript fetch api and securing the django rest framework data from users who are not authenticated.

## File Contents

### Project Folder
The folder "coaching" contains the project files, such as settings.py, urls.py, etc.

### App Folder
The folder "booking" contains the app files, for example urls.py, forms.py, serializers.py, etc. Also, this folder contains folders "static" (for static files, for example book.js) and "templates" (which contains the html files for the booking app).

### Media Folder
This folder contains another folder labeled "images" that contains the profile pictures of the coaches.

### Requirements.txt
This file lists the modules that are required to run this application.




