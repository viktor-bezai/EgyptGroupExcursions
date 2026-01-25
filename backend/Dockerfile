FROM python:3.13-slim

WORKDIR /app

# Install system dependencies including Chromium for Selenium
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    g++ \
    curl \
    wget \
    # Chromium and dependencies
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Set Chrome binary location for Selenium
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_PATH=/usr/bin/chromedriver

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy application code
COPY . .

# Create static and media directories
RUN mkdir -p staticfiles media/social_posts/instagram media/social_posts/tiktok

EXPOSE 8000

# Default command for development
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
