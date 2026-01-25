FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy application code
COPY . .

# Create static and media directories
RUN mkdir -p staticfiles media

EXPOSE 8000

# Default command for development
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
