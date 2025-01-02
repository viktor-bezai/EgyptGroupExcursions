import { List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import {TravelersAssistantMenuOption} from "@/pages/travelers-assistant";
import {useTranslation} from "react-i18next";

interface LeftMenuProps {
  activeMenu: TravelersAssistantMenuOption;
  setActiveMenu: (menu: TravelersAssistantMenuOption) => void;
}

const LeftMenu = ({ activeMenu, setActiveMenu }: LeftMenuProps) => {
  const {t} = useTranslation("common");
  return (
    <Box sx={{ width: "250px", borderRight: "1px solid #ddd", p: 2 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={activeMenu === "checklist"}
            onClick={() => setActiveMenu("checklist")}
          >
            <ListItemText primary={t("checklist")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={activeMenu === "weather"}
            onClick={() => setActiveMenu("weather")}
          >
            <ListItemText primary={t("weather")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={activeMenu === "calendar"}
            onClick={() => setActiveMenu("calendar")}
          >
            <ListItemText primary={t("excursion-calendar")} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default LeftMenu;
