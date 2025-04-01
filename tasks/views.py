from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Tasks  
from .serializers import TaskSerializer
from django.shortcuts import get_object_or_404


# Test endpoint for authorization.
from rest_framework.permissions import IsAuthenticated

class HelloWorldView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication

    def get(self, request):
        return Response({"message": "Hello, World!"}, status=200)


# Return list of all tasks - Only authenticated users can view their tasks, admins can view all tasks
class TaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_staff:  # Admin can view all tasks
            tasks = Tasks.objects.all() 
        else:  # Consumers can only view their own tasks
            tasks = Tasks.objects.filter(user=user)  

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


# Task Retrieve View - View details of a single task
class TaskRetrieveView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        task = get_object_or_404(Tasks, id=id)  
        # print("inside",task)

        # Check if the user is either an admin or the owner of the task
        if request.user == task.user or request.user.is_staff:
            serializer = TaskSerializer(task)
            return Response(serializer.data)
        return Response({"error": "You do not have permission to view this task."}, status=status.HTTP_403_FORBIDDEN)


# Create tasks - Only authenticated users can create tasks
class TaskCreateView(APIView):
    permission_classes = [IsAuthenticated]
            
    def post(self, request):
        user = request.user
        # print(user)
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)  # Save the task with the logged-in user as the creator
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"message":"error"}, status=status.HTTP_400_BAD_REQUEST)


# Update tasks - Only the creator of the task or an admin can update a task


class TaskUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        task = get_object_or_404(Tasks, id=id)

        # Debugging: Print incoming request data

        # Checking if the user is the task creator or an admin
        if request.user == task.user or request.user.is_staff:
            serializer = TaskSerializer(task, data=request.data, partial=True)  # Allow partial updates
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)  # Success response
            
            # Debugging: Print serializer errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "You do not have permission to update this task."}, status=status.HTTP_403_FORBIDDEN)


# Delete tasks - Only the creator of the task or an admin can delete a task
class TaskDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        task = get_object_or_404(Tasks, id=id)  # Use Tasks model here

        # Check if the user is the task creator or an admin
        if request.user == task.user or request.user.is_staff:
            task.delete()  # Delete the task
            return Response({"message": "Task deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "You do not have permission to delete this task."}, status=status.HTTP_403_FORBIDDEN)


