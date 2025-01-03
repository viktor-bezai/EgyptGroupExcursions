import {GetServerSideProps} from "next";
import Head from "next/head";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import LeftMenu from "@/components/travelers-assistant/LeftMenu";
import ContentArea from "@/components/travelers-assistant/ContentArea";

interface TravelersAssistantPageProps {
  lang: string;
}

export type TravelersAssistantMenuOption = "checklist" | "weather" | "calendar";

export const getServerSideProps: GetServerSideProps<TravelersAssistantPageProps> = async (context) => {
  const lang = context.locale || "ru";

  return {
    props: {lang},
  };
};

const TravelersAssistantPage = ({lang}: TravelersAssistantPageProps) => {
  const {i18n} = useTranslation("common");
  const [activeMenu, setActiveMenu] = useState<TravelersAssistantMenuOption>("checklist");

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
      <Box sx={{display: "flex", minHeight: "50vh"}}>
        {/* Left Menu */}
        <LeftMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
        {/* Content Area */}
        <ContentArea activeMenu={activeMenu}/>
      </Box>
    </>
  );
};

export default TravelersAssistantPage;
