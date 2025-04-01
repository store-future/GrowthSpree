from rest_framework import serializers


from rest_framework import serializers
from .models import Tasks


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['id', 'user', 'title', 'description', 'status', 'created_at', 'updated_at']
        extra_kwargs = {
            'user': {'required': False}  # Exclude user field from being required in the serializer
        }