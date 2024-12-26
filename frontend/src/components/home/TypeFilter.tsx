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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 1, // Пространство между кнопками
        maxWidth: "200px", // Ограничение ширины фильтра
        width: "100%", // Автоматическая подстройка
      }}
    >
      <Button
        key={"all"}
        onClick={() => onSelectType(null)}
        variant="outlined"
        color={!selectedType ? "primary" : "inherit"}
      >
        {t("all-types")}
      </Button>
      {tourTypes.map((type) => (
        <Button
          key={type.id}
          onClick={() => onSelectType(type)}
          variant="outlined"
          color={selectedType?.id === type.id ? "primary" : "inherit"}
        >
          {type.name}
        </Button>
      ))}
    </Box>
  );
};

export default TypeFilter;
