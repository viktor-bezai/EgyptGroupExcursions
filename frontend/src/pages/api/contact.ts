import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, preferredContact, contactLink, message, tour } = req.body;

  // Validate data
  if (!firstName || !lastName || !preferredContact || !message) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields: {
        firstName: !firstName,
        lastName: !lastName,
        preferredContact: !preferredContact,
        message: !message,
      },
    });
  }

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const formType = tour ? `Бронирование: ${tour.title}` : "Запрос на контакт"

    const text = `
      ✉️ ${formType}
      🧑 Имя: ${firstName}
      👩 Фамилия: ${lastName}
      📞 Тип контакта: ${preferredContact}
      🔗 Ссылка: ${contactLink || "N/A"}
      📝 Сообщение: ${message}
    `;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram.");
    }

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send message" });
  }
};

export default handler;
