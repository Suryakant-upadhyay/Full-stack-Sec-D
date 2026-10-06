from django.urls import path
from students import views

urlpatterns = [
    path("", views.index, name="students-index"),
]
