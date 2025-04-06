# ./Dockerfile

# Choose an official Python runtime as a parent image
FROM python:3.10

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies if needed (uncomment and add packages if required)
# Install system dependencies for PostgreSQL client
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    # psycopg2 \
    libpq-dev \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code from the host to the container into /app
# This includes manage.py, taskmaster/, accounts/, tasks/, etc.
# Files listed in .dockerignore will be skipped.
COPY . .

# Expose the port the app runs on (standard Django dev port)
EXPOSE 8000

# Define the default command to run when the container starts.
# This starts the Django development server.
# '0.0.0.0' makes it accessible from outside the container network.
# For production, replace this with a production server like Gunicorn or uWSGI.
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]