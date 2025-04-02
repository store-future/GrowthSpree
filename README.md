# GrowthSpree
assignment-backend-developer

## Django Task-Based Web API
This project is a **Django Rest Framework (DRF)**-based Task Management System with **JWT authentication**. The frontend is built using **React**, and **PostgreSQL** is used as the database for storing information.

## Django Project Architecture
- **Project Name:** `taskmaster`
- **Microservices Architecture:**
  - `accounts`: Handles user authentication (login and registration) with JWT authentication.
  - `tasks`: Implements CRUD functionality for task management.
- **Database:** PostgreSQL

### Folder Structure
- `taskmaster/` - Contains `settings.py` and other configuration files.
- `accounts/` - Manages user login, registration, and authentication.
- `tasks/` - Implements task management operations (CRUD).

## Role-Based Access Control (RBAC)
Two types of users can be created:
- **Admin**: Can perform CRUD operations on all tasks.
- **Consumer**: Can only perform CRUD operations on tasks they have created.

## API Endpoints

### Project-Level Endpoints
- `admin/` - Admin panel
- `accounts/` - Authentication-related routes
- `tasks/` - Task-related operations

### Accounts App Endpoints
- `accounts/register/` - Register a new user.
- `accounts/login/` - Authenticate and log in a user.
- `api/token/` - Obtain an access and refresh token.
- `api/token/refresh/` - Refresh the access token using a valid refresh token.
- **Logout** - Handled on the client side by removing stored tokens.

### Tasks App Endpoints
- `tasks/` - Retrieve all tasks
- `tasks/<int:id>/` - Retrieve a single task
- `tasks/create/` - Create a new task
- `tasks/<int:id>/update/` - Update an existing task
- `tasks/<int:id>/delete/` - Delete a task

## How to Start This Project Locally
At the root level, Django files exist, along with a `frontend/` folder containing React files.

### For Django
1. Create a virtual environment:
   ```bash
   python -m venv env

#### For Django
```bash
# Create a virtual environment
python -m venv env 

# Activate the virtual environment
# Windows
env\Scripts\activate
# Ubuntu/macOS
source env/bin/activate

# Install necessary dependencies
pip install -r requirements.txt

# Setup PostgreSQL and apply migrations
python manage.py makemigrations and then migrate

# Start the Django development server
python manage.py runserver


# Navigate to the frontend directory
cd frontend/user-auth

# Install dependencies
npm install

# Start the React development server
npm start

# IMP - Change the base url to django server
Directory = /frontend/user-auth/src/services/auth.jsx
export const API_BASE_URL = "http://192.168.1.7:8000"; 









