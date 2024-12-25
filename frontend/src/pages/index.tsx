import React, { useMemo, useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box, Grid, Typography } from "@mui/material";
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

const Home = ({
  tours,
  tourCategories,
  tourTypes,
  lang,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t, i18n } = useTranslation("common");
  const [selectedCategory, setSelectedCategory] = useState<tourCategory | null>(null);
  const [selectedType, setSelectedType] = useState<tourType | null>(null);

  // Ensure translations are consistent
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const filteredTours = useMemo(() => {
    let filtered = tours;

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter((tour) => tour.category.id === selectedCategory.id);
    }

    // Further filter by selected type
    if (selectedType) {
      filtered = filtered.filter((tour) => tour.types.some((type) => type.id === selectedType.id));
    }

    return filtered;
  }, [tours, selectedCategory, selectedType]);

  return (
    <Box mb={6}>
      {/* Page Header */}
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {t("title")}
        </Typography>
      </Box>

      {/* Category Filter on Top */}
      <Box mb={4}>
        <CategoryFilter
          tourCategories={tourCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          t={t}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Tours Grid */}
        <Grid item xs={12} md={9}>
          <Box>
            <Grid container spacing={4} justifyContent="center">
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <Grid item xs={12} sm={6} md={4} key={tour.id}>
                    <TourCard tour={tour} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                  {t("no-tours")}
                </Typography>
              )}
            </Grid>
          </Box>
        </Grid>

        {/* Type Filter on the Right */}
        <Grid item xs={12} md={3}>
          <Box>
            <TypeFilter
              tourTypes={tourTypes}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              t={t}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
