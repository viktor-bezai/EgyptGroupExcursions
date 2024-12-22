import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export interface Tour {
  id: number;
  image: string;
  title: string;
  description: string;
  cost_from: number;
  cost_to: number;
  is_available: boolean;
  category: {
    id: number;
    name: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const lang = context.locale || "ru";

  try {
    // Make a request to fetch tour details
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tours/${id}/?lang=${lang}`
    );

    if (!res.ok) {
      return { notFound: true }; // Return 404 if the tour is not found
    }

    const tour = await res.json();
    return { props: { tour, lang } };
  } catch (error) {
    console.error("Failed to fetch tour data:", error);
    return { notFound: true }; // Return 404 in case of an error
  }
};

const TourDetail = ({
  tour,
  lang,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t, i18n } = useTranslation("common");

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4, p: 2 }}>
      {/* Image Section */}
      <Box position="relative" sx={{ width: "100%", height: 400, mb: 4 }}>
        <Image
          src={tour.image ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${tour.image}` : "/images/placeholder.jpg"}
          alt={tour.title}
          fill
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      </Box>

      {/* Title */}
      <Typography variant="h3" gutterBottom>
        {tour.title}
      </Typography>

      {/* Description */}
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {tour.description}
      </Typography>

      {/* Cost */}
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        {t("cost")}: ${tour.cost_from} - ${tour.cost_to}
      </Typography>

      {/* Availability */}
      <Typography
        variant="h6"
        color={tour.is_available ? "success.main" : "error.main"}
        sx={{ mb: 4 }}
      >
        {tour.is_available ? t("available") : t("not-available")}
      </Typography>

      {/* Book Button */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" fullWidth>
          {t("book-now")}
        </Button>
      </Box>
    </Box>
  );
};

export default TourDetail;
