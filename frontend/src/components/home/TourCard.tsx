import React, {useCallback} from "react";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import Image from "next/image";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {truncateText} from "@/utils/textUtils";
import {Tour} from "@/pages/tours";

const TourCard: React.FC<{ tour: Tour }> = ({tour}) => {
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "";
  const {t} = useTranslation("common");
  const router = useRouter();

  const handleDetailsClick = useCallback(() => {
    router.push(`/tours/${tour.slug}`);
  }, [router, tour.slug]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 350,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Image Section */}
      <CardMedia>
        <Box position="relative" sx={{width: "100%", height: 150}}>
          <Image
            src={tour.image ? `${mediaUrl}${tour.image}` : "/images/placeholder.jpg"}
            alt={tour.title || t("tour-placeholder-alt")}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={!tour.image}
            style={{
              objectFit: "cover",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          />
        </Box>
      </CardMedia>

      {/* Content Section */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          {tour.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{mb: 1, minHeight: 65}}
        >
          {truncateText(tour.description, 100, t("default-description"))}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1, // Optional spacing
          }}
        >
          <Typography variant="body2" color="text.primary">
            {t("cost")}: <strong>${tour.cost_from} - ${tour.cost_to}</strong>
          </Typography>
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
        {/* Types Section */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {tour.types.map((type) => (
            <Typography
              key={type.id}
              variant="body2"
              sx={{
                px: 0.5,
                py: 0.2,
                backgroundColor: "background.default",
                borderRadius: "4px",
                border: "solid 1px gray",
                fontSize: "0.700rem",
              }}
            >
              {type.name}
            </Typography>
          ))}
        </Box>
      </CardContent>

      {/* Actions Section */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 1,
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button variant="contained" color="primary" fullWidth onClick={() => alert(t("book-now"))}>
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
