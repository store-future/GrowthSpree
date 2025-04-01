from django.contrib import admin
from accounts.models import CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'name', 'user_roles', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('user_roles', 'is_active', 'is_staff', 'is_superuser')
    
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'user_roles')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'user_roles'),
        }),
    )

    search_fields = ('email', 'name')
    ordering = ('email', 'id')
    filter_horizontal = ()

# Register CustomUser with custom UserModelAdmin
admin.site.register(CustomUser, UserModelAdmin)
