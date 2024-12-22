import React from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { Tour } from "@/pages";
import { useTranslation } from "react-i18next";
import sanitizeHtml from "sanitize-html";


const TourCard: React.FC<{ tour: Tour }> = ({ tour }) => {
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { t } = useTranslation("common");
  const router = useRouter();

  const truncateText = (htmlString: string, length: number) => {
  // Sanitize HTML to plain text
  const sanitizedString = sanitizeHtml(htmlString, {
    allowedTags: [],
    allowedAttributes: {},
  });

  // Truncate sanitized string
  return sanitizedString.length > length ? `${sanitizedString.slice(0, length)}...` : sanitizedString;
};


  const handleDetailsClick = () => {
    router.push(`/tours/${tour.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Image Section */}
      <CardMedia>
        <Box position="relative" sx={{ width: "100%", height: 200 }}>
          <Image
            src={tour.image ? `${mediaUrl}${tour.image}` : "/images/placeholder.jpg"}
            alt={tour.title}
            fill
            style={{
              objectFit: "cover",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          />
        </Box>
      </CardMedia>

      {/* Content Section */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {tour.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {truncateText(tour.description, 100)}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {t("cost")}: <strong>${tour.cost_from} - ${tour.cost_to}</strong>
        </Typography>
        <Box mt={2}>
          <Typography
            variant="body2"
            sx={{
              color: tour.is_available ? "success.main" : "error.main",
              fontWeight: "bold",
            }}
          >
            {tour.is_available ? t("available") : t("not-available")}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions Section */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button variant="contained" color="primary" fullWidth onClick={() => alert(t("book-now") + " clicked!")}>
          {t("book-now")}
        </Button>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleDetailsClick}>
          {t("details")}
        </Button>
      </Box>
    </Card>
  );
};

export default TourCard;
