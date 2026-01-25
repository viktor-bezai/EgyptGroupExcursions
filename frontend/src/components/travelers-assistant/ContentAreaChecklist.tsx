import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ChecklistItemInterface {
  category: string;
  list_to_do: string[];
}

const ContentAreaChecklist = () => {
  const { t } = useTranslation("common");
  const checklistItems = t("checklistItems", {
    returnObjects: true,
  }) as ChecklistItemInterface[];

  return (
    <Box id="checklist-page" sx={{ maxWidth: "800px", mx: "auto", px: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: { xs: 2, md: 4 } }}
      >
        {t("checklist")}
      </Typography>
      {checklistItems.map((section, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ mb: { xs: 1, md: 3 }, boxShadow: 2 }}
        >
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              {section.category}
            </Typography>
            <Divider />
            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                pb: 0,
              }}
            >
              {section.list_to_do.map((item, idx) => (
                <ListItem
                  key={idx}
                  sx={{ display: "list-item", padding: 0, marginBottom: 0 }}
                >
                  <Typography sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ContentAreaChecklist;
