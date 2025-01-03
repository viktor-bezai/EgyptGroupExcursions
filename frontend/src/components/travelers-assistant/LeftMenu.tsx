import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { TravelersAssistantMenuOption } from "@/pages/travelers-assistant";
import { useTranslation } from "react-i18next";

interface LeftMenuProps {
  activeMenu: TravelersAssistantMenuOption;
  setActiveMenu: (menu: TravelersAssistantMenuOption) => void;
}

const LeftMenu = ({ activeMenu, setActiveMenu }: LeftMenuProps) => {
  const { t } = useTranslation("common");

  const menuOptions: { id: TravelersAssistantMenuOption; label: string }[] = [
    { id: "checklist", label: t("checklist") },
    { id: "weather", label: t("weather") },
    { id: "calendar", label: t("excursion-calendar") },
  ];

  return (
    <Box
      sx={{
        width: "300px",
        borderRight: "1px solid #ddd",
        p: 2,
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
        >
          {t("tools")}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ textAlign: "center" }}>
        {menuOptions.map((option) => (
          <Button
            key={option.id}
            onClick={() => setActiveMenu(option.id)}
            variant="outlined"
            color={activeMenu === option.id ? "primary" : "inherit"}
            sx={{
              mb: 1,
              width: "100%",
              textTransform: "none",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" },
                fontWeight: "normal",
              }}
            >
              {option.label}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default LeftMenu;
