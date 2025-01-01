import {GetServerSideProps} from "next";
import {Box, Grid} from "@mui/material";
import Head from "next/head";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import HomeTileMain from "@/components/home/HomeTileMain";

interface HomeTilesInterface {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface HomePageProps {
  lang: string;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  const lang = context.locale || "ru";

  return {
    props: {lang},
  };
};

const HomePage = ({lang}: HomePageProps) => {
  const {t, i18n} = useTranslation("common");

  const homeTiles: HomeTilesInterface[] = [
    {
      title: "tours",
      description: "tours-description",
      image: "/images/egypt_excursions.webp",
      link: "/tours",
    },
    {
      title: "about-me",
      description: "about-me-description",
      image: "/images/about_me.webp",
      link: "/about-me",
    },
    {
      title: "contacts",
      description: "contacts-description",
      image: "/images/contacts.webp",
      link: "/contacts",
    },
    {
      title: "travelers-assistant",
      description: "travelers-assistant-description",
      image: "/images/tools.webp",
      link: "/travelers-assistant",
    },
  ];

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <>
      <Head>
        <title>Home | Mystical Egypt Travels</title>
        <meta
          name="description"
          content="Discover the wonders of Egypt with Mystical Egypt Travels. Unique tours and excursions for an unforgettable journey."
        />
        <meta
          name="keywords"
          content="Mystical Egypt tours, travel Egypt, pyramid tours, Nile cruises, Cairo sightseeing, Luxor and Aswan, desert safari, Egypt excursions"
        />
      </Head>

      <Box
        sx={{
          width: {xs: "95%", md: "90%"},
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          pt: 2,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {homeTiles.map((linkBox, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <HomeTileMain
                title={t(linkBox.title)}
                description={t(linkBox.description)}
                image={linkBox.image}
                link={linkBox.link}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
