# core/api/urls.py
from django.urls import path
from .views import TodoListCreateView, TodoDetailView

urlpatterns = [
    #path('hello/', HelloView.as_view(), name='hello'),
    path('todos/', TodoListCreateView.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),
]