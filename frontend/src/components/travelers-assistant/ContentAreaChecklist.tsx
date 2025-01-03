import {useState} from "react";
import {Alert, Box, Button, Card, CardContent, Divider, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {generatePagePDF} from "@/utils/generatePagePDF";

const ContentAreaChecklist = () => {
  const {t} = useTranslation("common");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const thisPageId = "checklist-page"

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

  const handleDownloadPDF = async () => {
  try {
    await generatePagePDF(thisPageId, "mystical-egypt-travels.online_checklist.pdf");
    setSuccessMessage(t("checklist-downloaded-success"));
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

  return (
    <Box id={thisPageId} sx={{maxWidth: "800px", mx: "auto", px: 2}}>
      <Typography variant="h4" gutterBottom sx={{fontWeight: "bold", textAlign: "center", mb: 4}}>
        {t("checklist")}
      </Typography>
      {checklistItems.map((section, index) => (
        <Card key={index} variant="outlined" sx={{mb: 3, boxShadow: 2}}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{fontWeight: "bold", color: "primary.main"}}>
              {section.category}
            </Typography>
            <Divider sx={{mb: 2}}/>
            <ul style={{paddingLeft: "1.5rem"}}>
              {section.items.map((item, idx) => (
                <li key={idx} style={{marginBottom: "0.5rem"}}>
                  <Typography>{item}</Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadPDF}
          sx={{
            px: 4,
          }}
        >
          {t("download-pdf")}
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{mt: 4}}>
          {successMessage}
        </Alert>
      )}
    </Box>
  );
};

export default ContentAreaChecklist;
