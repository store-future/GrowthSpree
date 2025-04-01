# accounts/urls.py
from django.urls import path
from .views import *

from django.urls import path
from .views import TaskCreateView, TaskListView, TaskRetrieveView, TaskUpdateView, TaskDeleteView

urlpatterns = [
    path('hello/', HelloWorldView.as_view(), name='hello'),  # Test endpoint

    path('tasks/', TaskListView.as_view(), name='task_list'),                      # Retrive all tasks
    path('tasks/<int:id>/', TaskRetrieveView.as_view(), name='task_detail'),       # Retrve a single task
    path('tasks/create/', TaskCreateView.as_view(), name='task_create'),           # Create new task
    path('tasks/<int:id>/update/', TaskUpdateView.as_view(), name='task_update'),  # Update task
    path('tasks/<int:id>/delete/', TaskDeleteView.as_view(), name='task_delete'),  # Delete task
]

 