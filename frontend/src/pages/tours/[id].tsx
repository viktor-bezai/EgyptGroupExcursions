import React, {useEffect} from "react";
import {GetServerSideProps} from "next";
import {Box, Button, Typography} from "@mui/material";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {DescriptionRenderer} from "@/utils/textUtils";

// Interfaces
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

interface TourDetailProps {
  tour: Tour;
  lang: string;
}

export const getServerSideProps: GetServerSideProps = async ({params, locale}) => {
  const {id} = params!;
  const lang = locale || "ru";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tours/${id}/?lang=${lang}`
    );

    if (!response.ok) {
      console.error(`Failed to fetch tour data: ${response.statusText}`);
      return {notFound: true};
    }

    const tour: Tour = await response.json();
    return {props: {tour, lang}};
  } catch (error) {
    console.error("Error fetching tour data:", error);
    return {notFound: true};
  }
};

const TourDetail = (props: TourDetailProps) => {
  const {tour, lang} = props
  const {t, i18n} = useTranslation("common");

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <Box sx={{maxWidth: 800, mx: "auto", my: 4, p: 2}}>
      {/* Image Section */}
      <Box position="relative" sx={{width: "100%", height: 400, mb: 4}}>
        <Image
          src={
            tour.image
              ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${tour.image}`
              : "/images/placeholder.jpg"
          }
          alt={tour.title}
          fill
          style={{objectFit: "cover", borderRadius: "8px"}}
        />
      </Box>

      {/* Title */}
      <Typography variant="h3" gutterBottom>
        {tour.title}
      </Typography>

      {/* Description */}
      <DescriptionRenderer description={tour.description}/>

      {/* Cost */}
      <Typography variant="h5" color="primary" sx={{mb: 2}}>
        {t("cost")}: ${tour.cost_from} - ${tour.cost_to}
      </Typography>

      {/* Availability */}
      <Typography
        variant="h6"
        color={tour.is_available ? "success.main" : "error.main"}
        sx={{mb: 4}}
      >
        {tour.is_available ? t("available") : t("not-available")}
      </Typography>

      {/* Book Button */}
      <Box sx={{display: "flex", gap: 2}}>
        <Button variant="contained" color="primary" fullWidth>
          {t("book-now")}
        </Button>
      </Box>
    </Box>
  );
};

export default TourDetail;
