import React, { useEffect, useMemo, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import TourCard from "@/components/home/TourCard";
import { fetchHomePageData } from "@/utils/api";
import CategoryFilter from "@/components/home/CategoryFilter";
import TypeFilter from "@/components/home/TypeFilter";

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
}

interface HomeProps {
  tours: Tour[];
  tourCategories: tourCategory[];
  tourTypes: tourType[];
  lang: string;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const lang = context.locale || "ru";
  const { tours, tourCategories, tourTypes } = await fetchHomePageData(lang);

  return {
    props: { tours, tourCategories, tourTypes, lang },
  };
};

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { tours, tourCategories, tourTypes, lang } = props;
  const { t, i18n } = useTranslation("common");
  const [selectedCategory, setSelectedCategory] = useState<tourCategory | null>(null);
  const [selectedType, setSelectedType] = useState<tourType | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const filteredTours = useMemo(() => {
    let filtered = tours;

    if (selectedCategory) {
      filtered = filtered.filter((tour) => tour.category.id === selectedCategory.id);
    }

    if (selectedType) {
      filtered = filtered.filter((tour) => tour.types.some((type) => type.id === selectedType.id));
    }

    return filtered;
  }, [tours, selectedCategory, selectedType]);

  return (
    <Box mb={6} position="relative">
      {/* Page Header */}
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {t("title")}
        </Typography>
      </Box>

      {/* Filters for Mobile */}
      {isMobile && (
        <Box mb={4} display="flex" flexDirection="column" gap={2}>
          <CategoryFilter
            tourCategories={tourCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            t={t}
          />
          <TypeFilter
            tourTypes={tourTypes}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            t={t}
          />
        </Box>
      )}

      {/* Main Content */}
      <Grid container spacing={4} justifyContent="center" sx={{ px: 2 }}>
        {/* Left Area - Notifications (Hidden on Mobile) */}
        {!isMobile && (
          <Grid item xs={12} md={2}>
            <Box>
              <Typography variant="h6">{t("notifications")}</Typography>
              {/* Notifications content here */}
            </Box>
          </Grid>
        )}

        {/* Center Area - Tours */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4} justifyContent="center">
            {filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <Grid item xs={12} sm={6} md={4} key={tour.id}>
                  <TourCard tour={tour} />
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 4 }}
              >
                {t("no-tours")}
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Right Area - TypeFilter (Hidden on Mobile) */}
        {!isMobile && (
          <Grid item xs={12} md={2}>
            <TypeFilter
              tourTypes={tourTypes}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              t={t}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
