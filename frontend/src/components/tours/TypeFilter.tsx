import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { tourType } from "@/pages/tours";
import { useTranslation } from "react-i18next";

interface TypeFilterProps {
  tourTypes: tourType[];
  selectedTypes: tourType[];
  onSelectTypes: (types: tourType[]) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = (props) => {
  const { tourTypes, selectedTypes, onSelectTypes } = props;
  const { t } = useTranslation("common");

  const handleTypeToggle = (type: tourType) => {
    const isSelected = selectedTypes.some(
      (selectedType) => selectedType.id === type.id,
    );

    if (isSelected) {
      // Remove the type from selectedTypes
      onSelectTypes(
        selectedTypes.filter((selectedType) => selectedType.id !== type.id),
      );
    } else {
      // Add the type to selectedTypes
      onSelectTypes([...selectedTypes, type]);
    }
  };

  const isTypeSelected = (type: tourType) =>
    selectedTypes.some((selectedType) => selectedType.id === type.id);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row", // Horizontal for extra-small screens
          md: "column", // Vertical for small screens and above
        },
        alignItems: {
          xs: "center", // Center align items for horizontal layout
          md: "start", // Start align for vertical layout
        },
        justifyContent: {
          xs: "center", // Center buttons horizontally for small screens
          md: "start", // Align buttons to the start for larger screens
        },
        gap: 1,
        flexWrap: "wrap", // Wrap buttons in horizontal layout
      }}
    >
      <Button
        key={"all"}
        onClick={() => onSelectTypes([])} // Clear all selections
        variant="outlined"
        color={selectedTypes.length === 0 ? "primary" : "inherit"}
        sx={{
          minWidth: "auto", // Adjust width to fit the text
          textTransform: "none", // Preserve text case
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          {t("all-types")}
        </Typography>
      </Button>
      {tourTypes.map((type) => (
        <Button
          key={type.id}
          onClick={() => handleTypeToggle(type)}
          variant="outlined"
          color={isTypeSelected(type) ? "primary" : "inherit"}
          sx={{
            minWidth: "auto", // Adjust width to fit the text
            textTransform: "none", // Preserve text case
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            {type.name}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default TypeFilter;
