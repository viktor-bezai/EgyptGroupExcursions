import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {tourType} from "@/pages";
import {useTranslation} from "react-i18next";

interface TypeFilterProps {
  tourTypes: tourType[];
  selectedType: tourType | null;
  onSelectType: (type: tourType | null) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = (props) => {
  const {tourTypes, selectedType, onSelectType} = props;
  const {t} = useTranslation("common");

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
        onClick={() => onSelectType(null)}
        variant="outlined"
        color={!selectedType ? "primary" : "inherit"}
        sx={{
          minWidth: "auto", // Adjust width to fit the text
          textTransform: "none", // Preserve text case
        }}
      >
        <Typography
          sx={{
            fontSize: {xs: "0.8rem", sm: "1rem"},
          }}
        >
          {t("all-types")}
        </Typography>
      </Button>
      {tourTypes.map((type) => (
        <Button
          key={type.id}
          onClick={() => onSelectType(type)}
          variant="outlined"
          color={selectedType?.id === type.id ? "primary" : "inherit"}
          sx={{
            minWidth: "auto", // Adjust width to fit the text
            textTransform: "none", // Preserve text case
          }}
        >
          <Typography
            sx={{
              fontSize: {xs: "0.8rem", sm: "1rem"},
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
