import React, { useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

// Interfaces
export interface Tour {
  id: number;
  image: string;
  title: string;
  description: string; // HTML string
  cost_from: number;
  cost_to: number;
  is_available: boolean;
  category: {
    id: number;
    name: string;
  };
}

// Helper function for embedding media links
const processDescription = (description: string): string => {
  const youtubeRegex = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
  const tiktokRegex = /https?:\/\/(?:www\.)?tiktok\.com\/(?:@[\w.-]+\/video\/|v\/|embed\/)(\d+)(?:\?.*)?/g;

  const replaceWithIframe = (url: string, id: string, platform: string): string => {
    const aspectRatio = platform === "youtube" ? "56.25%" : "101%";
    return `
      <div style="margin: 1em 0; position: relative; padding-bottom: ${aspectRatio}; height: 0; overflow: hidden;">
        <iframe 
          src="${url}${id}"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
          allowfullscreen
          title="${platform.charAt(0).toUpperCase() + platform.slice(1)} Video"
        ></iframe>
      </div>`;
  };

  let processed = description.replace(youtubeRegex, (match, videoId) =>
    replaceWithIframe("https://www.youtube.com/embed/", videoId, "youtube")
  );

  processed = processed.replace(tiktokRegex, (match, videoId) =>
    replaceWithIframe("https://www.tiktok.com/embed/", videoId, "tiktok")
  );

  return processed;
};

// Fetching data server-side
export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const { id } = params!;
  const lang = locale || "ru";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tours/${id}/?lang=${lang}`
    );

    if (!response.ok) {
      return { notFound: true };
    }

    const tour: Tour = await response.json();
    return { props: { tour, lang } };
  } catch (error) {
    console.error("Error fetching tour data:", error);
    return { notFound: true };
  }
};

const TourDetail = ({ tour, lang }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t, i18n } = useTranslation("common");
  const theme = useTheme();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4, p: 2 }}>
      {/* Image Section */}
      <Box position="relative" sx={{ width: "100%", height: 400, mb: 4 }}>
        <Image
          src={
            tour.image
              ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${tour.image}`
              : "/images/placeholder.jpg"
          }
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
      <Box
        dangerouslySetInnerHTML={{ __html: processDescription(tour.description) }}
        sx={{
          mb: 4,
          p: 2,
          border: "1px solid",
          borderColor: theme.palette.divider,
          borderRadius: "8px",
          backgroundColor: theme.palette.background.default,
          "& img": { maxWidth: "100%", borderRadius: "8px", mt: 2 },
          "& a": { color: theme.palette.primary.main, textDecoration: "none" },
          "& p": { mb: 2, lineHeight: 1.6 },
        }}
      />

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
