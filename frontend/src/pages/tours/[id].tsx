import React, {useEffect} from "react";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Box, Typography, Button} from "@mui/material";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";

// Interfaces
export interface Tour {
  id: number;
  image: string;
  title: string;
  description: string; // CKEditor HTML string
  cost_from: number;
  cost_to: number;
  is_available: boolean;
  category: {
    id: number;
    name: string;
  };
}

// Description Renderer
const DescriptionRenderer: React.FC<{ description: string }> = ({description}) => {
  const theme = useTheme();

  // Function to process the content
  const processContent = (content: string): string => {
    const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "";

    // Match and update image src attributes
    const updatedContent = content.replace(
      /<img[^>]+src="\/media\/ckeditor\/([^"]+)"/g,
      `<img src="${mediaUrl}/media/ckeditor/$1"`
    );

    // Match TikTok video links (if needed)
    const tiktokRegex = /https?:\/\/(?:www\.)?tiktok\.com\/(?:@[\w.-]+\/video\/|v\/|embed\/)(\d+)(?:\?.*)?/g;
    const finalContent = updatedContent.replace(tiktokRegex, (match, videoId) => {
      return `
        <div style="margin: 1em 0; position: relative; padding-bottom: 101%; height: 0; overflow: hidden;">
          <iframe 
            src="https://www.tiktok.com/embed/${videoId}" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
            allowfullscreen
            title="TikTok Video">
          </iframe>
        </div>`;
    });

    return finalContent;
  };

  return (
    <Box
      dangerouslySetInnerHTML={{__html: processContent(description)}}
      sx={{
        mb: 4,
        p: 2,
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
        },
        "& a": {color: theme.palette.primary.main, textDecoration: "none"},
        "& .image-style-align-left": {
          float: "left",
          marginRight: 2,
          marginBottom: 2,
          maxWidth: "50%",
        },
        "& .image-style-align-right": {
          float: "right",
          marginLeft: 16,
          marginBottom: 16,
          maxWidth: "50%",
        },
        "& .image-style-align-center": {
          display: "block",
          margin: "auto",
        },
        "&:after": {
          content: '""',
          display: "block",
          clear: "both",
        },
      }}
    />
  );
};


// Fetching data server-side
export const getServerSideProps: GetServerSideProps = async ({params, locale}) => {
  const {id} = params!;
  const lang = locale || "en";

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

const TourDetail = ({
                      tour,
                      lang,
                    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {t, i18n} = useTranslation("common");

  useEffect(() => {
    i18n.changeLanguage(lang);
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
