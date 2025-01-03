import { useState } from "react";
import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import {useTranslation} from "react-i18next";

const ContentAreaChecklist = () => {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const checklistItems = [
    {
      category: "Документы",
      items: [
        "Паспорт (действителен минимум 6 месяцев с даты въезда).",
        "Виза (если требуется, оформите заранее или получите по прилёту).",
        "Страховка (медицинская и от несчастных случаев).",
        "Билеты (авиабилеты туда и обратно, электронные или распечатанные).",
        "Подтверждение брони отеля.",
        "Копии всех документов (паспорт, виза, страховка) на случай утери.",
      ],
    },
    {
      category: "Финансы",
      items: [
        "Банковская карта (убедитесь, что её можно использовать за границей).",
        "Наличные деньги (доллары, евро или египетские фунты).",
        "Резервная сумма на случай непредвиденных расходов.",
      ],
    },
    {
      category: "Связь и Интернет",
      items: [
        "Международный роуминг или локальная SIM-карта.",
        "Установите мессенджеры и приложения для связи (например, WhatsApp).",
        "Скачайте оффлайн-карты (Google Maps, MAPS.ME).",
      ],
    },
    {
      category: "Одежда и обувь",
      items: [
        "Легкая одежда для жаркого климата.",
        "Купальники, пляжная обувь.",
        "Головной убор для защиты от солнца.",
        "Удобная обувь для экскурсий.",
        "Накидка или шарф для посещения храмов и мечетей.",
      ],
    },
    {
      category: "Медицина и здоровье",
      items: [
        "Личные медикаменты (с запасом на весь период).",
        "Солнцезащитный крем и средства от ожогов.",
        "Средства от укусов насекомых.",
        "Антисептики и маски (для личной гигиены).",
      ],
    },
    {
      category: "Техника",
      items: [
        "Зарядные устройства для телефонов, планшетов, фотоаппаратов.",
        "Пауэрбанк.",
        "Переходник для розеток (если требуется).",
      ],
    },
    {
      category: "Планирование и развлечения",
      items: [
        "Расписание экскурсий или список мест, которые хотите посетить.",
        "Скачайте фильмы, книги или музыку для перелета.",
        "Проверьте прогноз погоды на дни поездки.",
      ],
    },
    {
      category: "Безопасность",
      items: [
        "Информация о местных правилах и законах.",
        "Контакты консульства и экстренных служб.",
        "Избегайте употребления воды из-под крана, только бутилированную.",
      ],
    },
    {
      category: "Проверка багажа",
      items: [
        "Ограничения по весу и размерам багажа авиакомпании.",
        "Все острые предметы и жидкости убраны в сдаваемый багаж.",
        "Ручная кладь соответствует требованиям (включая жидкости ≤100 мл).",
      ],
    },
    {
      category: "В день вылета",
      items: [
        "Проверьте наличие всех документов.",
        "Убедитесь, что у вас есть транспорт до аэропорта.",
        "Приезжайте в аэропорт за 2–3 часа до вылета.",
      ],
    },
  ];

  const handleSendEmail = () => {
    if (email) {
      // Simulate email sending
      setSuccessMessage(`Чеклист отправлен на ${email}`);
      setEmail(""); // Clear the email input
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t("checklist")}
      </Typography>
      {checklistItems.map((section, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {section.category}
          </Typography>
          <ul>
            {section.items.map((item, idx) => (
              <li key={idx}>
                <Typography>{item}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      ))}

      <Box sx={{ mt: 4 }}>
        <TextField
          label="Введите ваш email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendEmail}
          disabled={!email}
        >
          Отправить чеклист
        </Button>
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default ContentAreaChecklist;
