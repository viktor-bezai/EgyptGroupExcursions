import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  Collapse,
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tourType } from "@/pages/tours";
import { useTranslation } from "react-i18next";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface TypeFilterProps {
  tourTypes: tourType[];
  selectedTypes: tourType[];
  onSelectTypes: (types: tourType[]) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = (props) => {
  const { tourTypes, selectedTypes, onSelectTypes } = props;
  const { t } = useTranslation("common");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState(false);

  const handleTypeToggle = (type: tourType) => {
    const isSelected = selectedTypes.some((st) => st.id === type.id);
    if (isSelected) {
      onSelectTypes(selectedTypes.filter((st) => st.id !== type.id));
    } else {
      onSelectTypes([...selectedTypes, type]);
    }
  };

  const isTypeSelected = (type: tourType) =>
    selectedTypes.some((st) => st.id === type.id);

  const allSelected = selectedTypes.length === 0;

  if (isMobile) {
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: allSelected ? "divider" : "primary.main",
          overflow: "hidden",
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Tappable header */}
        <Box
          onClick={() => setExpanded((prev) => !prev)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1.5,
            backgroundColor: "subtle.main",
            borderBottom: expanded ? "1px solid" : "none",
            borderColor: "divider",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <FilterListIcon sx={{ fontSize: 18, color: "primary.main" }} />
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {t("filter")}
          </Typography>
          {!allSelected && (
            <Chip
              label={selectedTypes.length}
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: "0.7rem", ml: 0.5 }}
            />
          )}
          {!allSelected && (
            <Typography
              onClick={(e) => {
                e.stopPropagation();
                onSelectTypes([]);
              }}
              sx={{
                ml: "auto",
                mr: 1,
                fontSize: "0.75rem",
                color: "primary.main",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {t("reset")}
            </Typography>
          )}
          <ExpandMoreIcon
            sx={{
              ml: allSelected ? "auto" : 0,
              fontSize: 20,
              color: "text.secondary",
              transition: "transform 0.3s ease",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Box>

        {/* Collapsible chip/checkbox area */}
        <Collapse in={expanded}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.75,
              px: 1.5,
              py: 1.5,
            }}
          >
            {tourTypes.map((type) => {
              const checked = isTypeSelected(type);
              return (
                <Chip
                  key={type.id}
                  label={type.name}
                  variant={checked ? "filled" : "outlined"}
                  color={checked ? "primary" : "default"}
                  onClick={() => handleTypeToggle(type)}
                  sx={{
                    fontWeight: checked ? 600 : 400,
                    fontSize: "0.8rem",
                    transition: "all 0.2s ease",
                  }}
                />
              );
            })}
          </Box>
        </Collapse>
      </Box>
    );
  }

  // Desktop layout — unchanged
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
        border: "1px solid",
        borderColor: allSelected ? "divider" : "primary.main",
        overflow: "hidden",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.5,
          backgroundColor: "subtle.main",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <FilterListIcon sx={{ fontSize: 18, color: "primary.main" }} />
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {t("filter")}
        </Typography>
        {!allSelected && (
          <Typography
            onClick={() => onSelectTypes([])}
            sx={{
              ml: "auto",
              fontSize: "0.75rem",
              color: "primary.main",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {t("reset")}
          </Typography>
        )}
      </Box>

      {/* Checkbox list */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 1,
          py: 0.5,
        }}
      >
        {tourTypes.map((type) => {
          const checked = isTypeSelected(type);
          return (
            <FormControlLabel
              key={type.id}
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => handleTypeToggle(type)}
                  size="small"
                  sx={{
                    color: "text.disabled",
                    "&.Mui-checked": {
                      color: "primary.main",
                    },
                  }}
                />
              }
              label={type.name}
              sx={{
                mx: 0,
                py: 0.25,
                px: 1,
                borderRadius: 1,
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "subtle.main",
                },
                ...(checked && {
                  backgroundColor: "subtle.main",
                }),
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.875rem",
                  color: checked ? "primary.dark" : "text.primary",
                  fontWeight: checked ? 600 : 400,
                  transition: "color 0.2s ease, font-weight 0.2s ease",
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TypeFilter;
