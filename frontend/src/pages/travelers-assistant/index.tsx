import { GetServerSideProps } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import AssistantMenu from "@/components/travelers-assistant/AssistantMenu";
import ContentArea from "@/components/travelers-assistant/ContentArea";

interface TravelersAssistantPageProps {
  lang: string;
}

export type TravelersAssistantMenuOption = "checklist" | "weather" | "calendar";

export const getServerSideProps: GetServerSideProps<
  TravelersAssistantPageProps
> = async (context) => {
  const lang = context.locale || "ru";

  return {
    props: { lang },
  };
};

const TravelersAssistantPage = ({ lang }: TravelersAssistantPageProps) => {
  const { i18n } = useTranslation("common");
  const [activeMenu, setActiveMenu] =
    useState<TravelersAssistantMenuOption>("checklist");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <>
      <Head>
        <title>Travelers Assistant | Mystical Egypt Travels</title>
        <meta
          name="description"
          content="Удобные и полезные инструменты для путешествий. Проверьте чеклист до или перед вылетом или узнайте полезную информацию."
        />
        <meta
          name="keywords"
          content="чеклист перед вылетом, полезная информация Египет, погода Египет, календарь экскурсий Египет"
        />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Adjust layout based on screen size
          minHeight: "50vh",
        }}
      >
        {/* Assistant Menu */}
        <AssistantMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        {/* Content Area */}
        <Box
          sx={{
            flex: 1, // Take up remaining space
            mt: isMobile ? 2 : 0, // Add margin-top for mobile layout
          }}
        >
          <ContentArea activeMenu={activeMenu} />
        </Box>
      </Box>
    </>
  );
};

export default TravelersAssistantPage;
