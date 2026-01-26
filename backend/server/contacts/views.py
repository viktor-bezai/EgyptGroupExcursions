import logging
import os

import requests
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)


class ContactView(APIView):
    """Handle contact form submissions and send to Telegram."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        first_name = data.get("firstName", "")
        last_name = data.get("lastName", "")
        preferred_contact = data.get("preferredContact", "")
        contact_link = data.get("contactLink", "")
        message = data.get("message", "")
        tour = data.get("tour")

        # Build Telegram message
        tour_info = ""
        if tour:
            tour_title = tour.get("title", "Unknown")
            tour_info = f"\n🎯 *Тур:* {tour_title}"

        telegram_message = f"""
📬 *Новая заявка с сайта!*
{tour_info}
👤 *Имя:* {first_name} {last_name}
📱 *Способ связи:* {preferred_contact}
🔗 *Контакт:* {contact_link}

💬 *Сообщение:*
{message}
        """.strip()

        # Send to Telegram
        bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
        chat_id = os.getenv("TELEGRAM_CHAT_ID")

        if not bot_token or not chat_id:
            logger.error("Telegram credentials not configured")
            return Response(
                {"message": "Server configuration error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        try:
            url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            response = requests.post(
                url,
                json={
                    "chat_id": chat_id,
                    "text": telegram_message,
                    "parse_mode": "Markdown",
                },
                timeout=10,
            )
            response.raise_for_status()
            logger.info(f"Contact form sent to Telegram: {first_name} {last_name}")
            return Response({"message": "Message sent successfully"})
        except requests.RequestException as e:
            logger.error(f"Failed to send Telegram message: {e}")
            return Response(
                {"message": "Failed to send message"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
