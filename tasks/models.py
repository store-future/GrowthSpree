from django.db import models
from accounts.models import CustomUser  


class Tasks(models.Model):
    TASK_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Foreign key relationship with user model
    title = models.CharField(max_length = 80)
    description = models.TextField()
    status = models.CharField(max_length=13, choices = TASK_CHOICES, default = 'pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
