import React, { useState, useMemo } from "react";
import { GetServerSideProps } from "next";
import { Box, Button, Grid, Typography } from "@mui/material";
import TourCard from "@/components/home/TourCard";

interface Category {
  id: number;
  name: string;
}

export interface Tour {
  id: number;
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
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch tours and categories
    const [toursRes, categoriesRes] = await Promise.all([
      fetch("http://127.0.0.1:8000/api/v1/tours/"),
      fetch("http://127.0.0.1:8000/api/v1/tours/categories"),
    ]);

    const [tours, categories] = await Promise.all([
      toursRes.json(),
      categoriesRes.json(),
    ]);

    return { props: { tours, categories } };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { props: { tours: [], categories: [] } };
  }
};

const Home: React.FC<HomeProps> = ({ tours = [], categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredTours = useMemo(() => {
    if (!selectedCategory) {
      return tours;
    }
    return tours.filter((tour) => tour.category.id === selectedCategory.id);
  }, [tours, selectedCategory]);

  const handleCategoryClick = (category: Category | null) => {
    setSelectedCategory(category);
  };

  return (
    <Box>
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Available Tours
        </Typography>
      </Box>

      {/* Categories Filter */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Button
          key={"all"}
          onClick={() => handleCategoryClick(null)}
          variant="outlined"
          sx={{ mx: 1 }}
          color={!selectedCategory ? "primary" : "inherit"}
        >
          All Categories
        </Button>

        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            variant="outlined"
            sx={{ mx: 1 }}
            color={selectedCategory?.id === category.id ? "primary" : "inherit"}
          >
            {category.name}
          </Button>
        ))}
      </Box>

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
              No tours available for the selected category.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
