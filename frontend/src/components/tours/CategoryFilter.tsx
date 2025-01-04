import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {tourCategory} from "@/pages/tours";
import {useTranslation} from "react-i18next";

interface CategoryFilterProps {
  tourCategories: tourCategory[];
  selectedCategory: tourCategory | null;
  onSelectCategory: (category: tourCategory | null) => void;
}

const CategoryFilter = (props: CategoryFilterProps) => {
  const {tourCategories, selectedCategory, onSelectCategory} = props
  const {t} = useTranslation("common");

  return (
    <Box sx={{mb: {xs: 1, md: 4}, textAlign: "center"}}>
      <Button
        key={"all"}
        onClick={() => onSelectCategory(null)}
        variant="outlined"
        sx={{mb: 1}}
        color={!selectedCategory ? "primary" : "inherit"}
      >
        <Typography
          sx={{
            fontSize: {xs: "0.8rem", sm: "1rem"},
          }}
        >
          {t("all-categories")}
        </Typography>
      </Button>
      {tourCategories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onSelectCategory(category)}
          variant="outlined"
          sx={{mb: 1, ml: 1}}
          color={selectedCategory?.id === category.id ? "primary" : "inherit"}
        >
          <Typography
            sx={{
              fontSize: {xs: "0.8rem", sm: "1rem"},
            }}
          >
            {category.name}
          </Typography>
        </Button>
      ))}
    </Box>
  )
};

export default CategoryFilter