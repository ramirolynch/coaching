from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'booking', views.BookingViewSet)
router.register(r'available', views.AvailableViewSet)
router.register(r'coach', views.CoachViewSet)
router.register(r'user', views.UserViewSet)

urlpatterns = [

    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')), 
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("<int:coach>", views.coachavails, name="coachavails"),
    path("manageschedules", views.manageschedules, name="manageschedules"),
    path("createbooking", views.createbooking, name="createbooking"),
    path("upcomingbookings", views.upcomingbookings, name="upcomingbookings"),
    path("coaches", views.coaches, name="coaches"),
    path("coachdetail/<int:coach>", views.coachdetail, name="coachdetail"),
    path("mybookings", views.mybookings, name="mybookings"),
    
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, 
    document_root=settings.MEDIA_ROOT)



