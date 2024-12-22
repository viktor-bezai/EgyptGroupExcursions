import React from "react";
import {Box, Button} from "@mui/material";
import {Category} from "@/pages";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  t: (key: string) => string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = (props) => {
  const { categories, selectedCategory, onSelectCategory, t } = props

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
    {categories.map((category) => (
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