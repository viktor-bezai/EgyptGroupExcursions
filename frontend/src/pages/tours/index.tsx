import React, {useEffect, useMemo, useState} from "react";
import {GetServerSideProps} from "next";
import {Box, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import TourCard from "@/components/tours/TourCard";
import {fetchHomePageData} from "@/utils/api";
import CategoryFilter from "@/components/tours/CategoryFilter";
import TypeFilter from "@/components/tours/TypeFilter";
import Head from 'next/head';
import NotificationsPanel from "@/components/tours/NotificationsPanel";
import {useNotifications} from "@/context/NotificationsContext";

export interface tourCategory {
  id: number;
  name: string;
}

export interface tourType {
  id: number;
  name: string;
}

export interface Tour {
  id: number;
  image: string;
  title: string;
  description: string;
  cost_from: number;
  cost_to: number;
  is_available: boolean;
  category: tourCategory;
  types: tourType[];
  slug: string
}

interface ToursProps {
  tours: Tour[];
  tourCategories: tourCategory[];
  tourTypes: tourType[];
  lang: string;
}

export const getServerSideProps: GetServerSideProps<ToursProps> = async (context) => {
  const lang = context.locale || "ru";
  const {tours, tourCategories, tourTypes} = await fetchHomePageData(lang);

  return {
    props: {tours, tourCategories, tourTypes, lang},
  };
};

const Tours = (props: ToursProps) => {
  const {tours, tourCategories, tourTypes, lang} = props;
  const {notifications} = useNotifications();

  const {t, i18n} = useTranslation("common");

  const [selectedCategory, setSelectedCategory] = useState<tourCategory | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<tourType[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const filteredTours = useMemo(() => {
    let filtered = tours;

    if (selectedCategory) {
      filtered = filtered.filter((tour) => tour.category.id === selectedCategory.id);
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((tour) =>
        selectedTypes.every((selectedType) =>
          tour.types.some((type) => type.id === selectedType.id)
        )
      );
    }

    return filtered;
  }, [tours, selectedCategory, selectedTypes]);

  // Generate dynamic keywords
  const keywords = useMemo(() => {
    const pre_setup_keywords = "Мистические туры по Египту, путешествия по Египту, экскурсии, туры к пирамидам, круизы по Нилу, достопримечательности Каира, Луксор и Асуан, сафари в пустыне, туры по Египту, исторические экскурсии";
    const tourTitles = filteredTours.map((tour) => tour.title);
    const categoryNames = tourCategories.map((category) => category.name);
    const typeNames = tourTypes.map((type) => type.name);

    // Combine pre-setup keywords with dynamically generated ones
    const dynamicKeywords = [...tourTitles, ...categoryNames, ...typeNames].join(', ');

    return `${pre_setup_keywords}, ${dynamicKeywords}`;
  }, [filteredTours, tourCategories, tourTypes]);


  const toursJSONLD = filteredTours.map((tour) => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: tour.title,
    description: tour.description,
    image: tour.image,
    url: `https://mystical-egypt-travels.online/tours/${tour.slug}`,
    priceRange: `$${tour.cost_from} - $${tour.cost_to}`,
    isAccessibleForFree: false,
    available: tour.is_available,
  }));

  return (
    <>
      <Head>
        <title>Tours | Mystical Egypt Travels</title>
        <meta name="description"
              content="Откройте для себя чудеса Египта с Mystical Egypt Travels. Уникальные туры и экскурсии для незабываемого путешествия."/>
        <meta name="keywords" content={keywords}/>
        {/* Add JSON-LD structured data for tours */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(toursJSONLD),
          }}
        />
      </Head>


      <Box mb={6} position="relative">
        {/* Filters for Mobile */}
        {isMobile && (
          <Box mb={4} display="flex" flexDirection="column" gap={1}>
            <CategoryFilter
              tourCategories={tourCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <TypeFilter
              tourTypes={tourTypes}
              selectedTypes={selectedTypes}
              onSelectTypes={setSelectedTypes}
            />
          </Box>
        )}

        {/* Category Filter for Desktop */}
        {!isMobile && (
          <Box display="flex" flexDirection="column" gap={2}>
            <CategoryFilter
              tourCategories={tourCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </Box>
        )}

        {/* Main Content */}
        <Grid container justifyContent="center">
          {/* Left Area - Notifications (Hidden on Mobile) */}
          {!isMobile && (
            <Grid item xs={12} md={2}>
              <NotificationsPanel notifications={notifications}/>
            </Grid>
          )}

          {/* Center Area - Tours */}
          <Grid item xs={12} md={8}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{
                px: 2,
                justifyContent: {xs: "center", sm: "center"},
              }}
            >
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    xl={4}
                    key={tour.id}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TourCard tour={tour}/>
                  </Grid>
                ))
              ) : (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={"no-tours"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    textAlign="center"
                    sx={{
                      mt: {xs: 2, md: 4},
                    }}
                  >
                    {t("no-tours")}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Right Area - TypeFilter (Hidden on Mobile) */}
          {!isMobile && (
            <Grid item xs={12} md={2}>
              <TypeFilter
                tourTypes={tourTypes}
                selectedTypes={selectedTypes}
                onSelectTypes={setSelectedTypes}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Tours;
