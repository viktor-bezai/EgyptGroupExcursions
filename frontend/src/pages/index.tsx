import React, { useMemo, useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TourCard from "@/components/home/TourCard";
import { fetchToursAndCategories } from "@/utils/api";
import CategoryFilter from "@/components/home/CategoryFilter";

export interface Category {
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
  category: Category;
}

interface HomeProps {
  tours: Tour[];
  categories: Category[];
  lang: string;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const lang = context.locale || "ru";
  const { tours, categories } = await fetchToursAndCategories(lang);

  return {
    props: { tours, categories, lang },
  };
};

const Home = ({
  tours,
  categories,
  lang,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t, i18n } = useTranslation("common");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Ensure translations are consistent
  useEffect(() => {
    i18n.changeLanguage(lang); // Set the language to match the server-rendered language
  }, [lang, i18n]);

  const filteredTours = useMemo(() => {
    if (!selectedCategory) return tours;
    return tours.filter((tour) => tour.category.id === selectedCategory.id);
  }, [tours, selectedCategory]);

  return (
    <Box mb={6}>
      {/* Page Header */}
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {t("title")} {/* Ensure translations are synchronized */}
        </Typography>
      </Box>

      {/* Category Filters */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        t={t}
      />

      {/* Tours Grid */}
      <Box sx={{ width: "80%", mx: "auto" }}>
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
    </Box>
  );
};

export default Home;
