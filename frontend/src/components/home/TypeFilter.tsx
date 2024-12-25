import React from "react";
import { Box, Button } from "@mui/material";
import { tourType } from "@/pages";

interface TypeFilterProps {
  tourTypes: tourType[];
  selectedType: tourType | null;
  onSelectType: (type: tourType | null) => void;
  t: (key: string) => string;
}

const TypeFilter: React.FC<TypeFilterProps> = (props) => {
  const { tourTypes, selectedType, onSelectType, t } = props;

  return (
    <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "start" }}>
      <Button
        key={"all"}
        onClick={() => onSelectType(null)}
        variant="outlined"
        sx={{ mb: 1 }}
        color={!selectedType ? "primary" : "inherit"}
      >
        {t("all-types")}
      </Button>
      {tourTypes.map((type) => (
        <Button
          key={type.id}
          onClick={() => onSelectType(type)}
          variant="outlined"
          sx={{ mb: 1 }}
          color={selectedType?.id === type.id ? "primary" : "inherit"}
        >
          {type.name}
        </Button>
      ))}
    </Box>
  );
};

export default TypeFilter;
