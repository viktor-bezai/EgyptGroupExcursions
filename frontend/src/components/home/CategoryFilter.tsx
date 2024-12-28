import React from "react";
import {Box, Button} from "@mui/material";
import {tourCategory} from "@/pages";
import {useTranslation} from "react-i18next";

interface CategoryFilterProps {
  tourCategories: tourCategory[];
  selectedCategory: tourCategory | null;
  onSelectCategory: (category: tourCategory | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = (props) => {
  const { tourCategories, selectedCategory, onSelectCategory } = props
  const {t} = useTranslation("common");

  return <Box sx={{mb: {xs: 1, sm: 4}, textAlign: "center"}}>
    <Button
      key={"all"}
      onClick={() => onSelectCategory(null)}
      variant="outlined"
      sx={{mb: 1}}
      color={!selectedCategory ? "primary" : "inherit"}
    >
      {t("all-categories")}
    </Button>
    {tourCategories.map((category) => (
      <Button
        key={category.id}
        onClick={() => onSelectCategory(category)}
        variant="outlined"
        sx={{mb: 1, ml: 1}}
        color={selectedCategory?.id === category.id ? "primary" : "inherit"}
      >
        {category.name}
      </Button>
    ))}
  </Box>
};

export default CategoryFilter