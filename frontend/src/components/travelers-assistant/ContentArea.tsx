import {Box, Typography} from "@mui/material";
import {TravelersAssistantMenuOption} from "@/pages/travelers-assistant";
import ContentAreaChecklist from "@/components/travelers-assistant/ContentAreaChecklist";
import ContentAreaWeather from "@/components/travelers-assistant/ContentAreaWeather";
import ContentAreaCalendar from "@/components/travelers-assistant/ContentAreaCalendar";

interface ContentAreaProps {
  activeMenu: TravelersAssistantMenuOption;
}

const ContentArea = ({activeMenu}: ContentAreaProps) => {
  const renderContent = () => {
    switch (activeMenu) {
      case "checklist":
        return <ContentAreaChecklist/>
      case "weather":
        return <ContentAreaWeather/>
      case "calendar":
        return <ContentAreaCalendar/>
      default:
        return <Typography>Выберите пункт меню, чтобы увидеть контент.</Typography>;
    }
  };

  return (
    <Box sx={{flex: 1, p: 3}}>
      {renderContent()}
    </Box>
  );
};

export default ContentArea;
