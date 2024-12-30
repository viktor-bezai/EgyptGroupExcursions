import React, {useCallback, useEffect, useMemo, useState} from "react";
import {GetServerSideProps} from "next";
import {Box, Button, Dialog, DialogContent, Typography} from "@mui/material";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {DescriptionRenderer} from "@/utils/textUtils";
import {Tour} from "@/pages/tours/index";
import {fetchTourBySlug} from "@/pages/api/tours";
import Head from "next/head";
import ContactForm from "@/components/contacts/ContactForm";

interface TourDetailProps {
  tour: Tour;
  lang: string;
}

export const getServerSideProps: GetServerSideProps = async ({params, locale}) => {
  const {slug} = params!;
  const lang = locale || "ru";

  try {
    const tour = await fetchTourBySlug(slug as string, lang);

    if (!tour) {
      return {notFound: true};
    }

    return {props: {tour, lang}};
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {notFound: true};
  }
};

const TourDetail = (props: TourDetailProps) => {
  const {tour, lang} = props
  const {t, i18n} = useTranslation("common");

  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const handleBookNowClick = useCallback(() => {
    setContactFormOpen(true);
  }, []);

  const handleCloseContactForm = useCallback(() => {
    setContactFormOpen(false);
  }, []);

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // Generate dynamic keywords
  const keywords = useMemo(() => {
    const typeNames = tour.types.map((type) => type.name);
    return [tour.title, tour.category.name, ...typeNames].join(', ');
  }, [tour]);


  const toursJSONLD = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: tour.title,
    description: tour.description,
    image: `${process.env.NEXT_PUBLIC_MEDIA_URL}${tour.image}`,
    url: `https://mystical-egypt-travels.online/tours/${tour.slug}`,
    priceRange: `$${tour.cost_from} - $${tour.cost_to}`,
    isAccessibleForFree: false,
    available: tour.is_available,
  };

  return (
    <>
      <Head>
        <title>{tour.title} | Mystical Egypt Travels</title>
        <meta name="description" content={tour.title}/>
        <meta name="keywords" content={keywords}/>
        {/* Add JSON-LD structured data for tours */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(toursJSONLD),
          }}
        />
      </Head>

      <Box sx={{maxWidth: 800, mx: "auto", my: {xs: 1, md: 4}, p: {xs: 1, md: 2}}}>
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
          <Button variant="contained" color="primary" fullWidth onClick={handleBookNowClick}>
            {t("book-now")}
          </Button>
        </Box>
      </Box>

      {/* Contact Form Modal */}
      <Dialog
        open={isContactFormOpen}
        onClose={handleCloseContactForm}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            padding: 0,
            overflow: "hidden",
          }}
        >
          <ContactForm
            tour={tour}
            onClose={handleCloseContactForm}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TourDetail;
