import React from "react";
import {Box, Button} from "@mui/material";
import {tourCategory} from "@/pages";

interface CategoryFilterProps {
  tourCategories: tourCategory[];
  selectedCategory: tourCategory | null;
  onSelectCategory: (category: tourCategory | null) => void;
  t: (key: string) => string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = (props) => {
  const { tourCategories, selectedCategory, onSelectCategory, t } = props

  return <Box sx={{mb: 4, textAlign: "center"}}>
    <Button
      key={"all"}
      onClick={() => onSelectCategory(null)}
      variant="outlined"
      sx={{mx: 1}}
      color={!selectedCategory ? "primary" : "inherit"}
    >
      {t("all-categories")}
    </Button>
    {tourCategories.map((category) => (
      <Button
        key={category.id}
        onClick={() => onSelectCategory(category)}
        variant="outlined"
        sx={{mx: 1}}
        color={selectedCategory?.id === category.id ? "primary" : "inherit"}
      >
        {category.name}
      </Button>
    ))}
  </Box>
};

export default CategoryFilter