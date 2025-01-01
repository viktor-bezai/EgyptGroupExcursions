import {GetServerSideProps} from "next";
import {Box, Grid, Typography} from "@mui/material";
import Head from "next/head";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import Link from "next/link";

interface HomePageProps {
  lang: string;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  const lang = context.locale || "ru";

  return {
    props: {lang},
  };
};

const HomePage = (props: HomePageProps) => {
  const {lang} = props;
  const {t, i18n} = useTranslation("common");
  const linkBoxes = [
    {
      title: t("tours"),
      description: t("tours-description"),
      image: "/images/egypt_excursions.webp",
      link: "/tours",
    },
    {
      title: t("about-me"),
      description: t("about-me-description"),
      image: "/images/about_me.webp",
      link: "/about-me",
    },
    {
      title: t("contacts"),
      description: t("contacts-description"),
      image: "/images/contacts.webp",
      link: "/contacts",
    },
    {
      title: t("travelers-assistant"),
      description: t("travelers-assistant-description"),
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
          width: {xs: "90%", md: "80%"},
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {xs: "100%", lg: "60%"},
          }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {linkBoxes.map((linkBox, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Link href={linkBox.link} passHref>
                  <Box
                    sx={{
                      mx: "auto",
                      position: "relative",
                      minHeight: 250,
                      minWidth: 250,
                      borderRadius: 2,
                      overflow: "hidden",
                      backgroundImage: `url(${linkBox.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{color: "white", fontWeight: "bold", marginBottom: 1}}
                      >
                        {linkBox.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{color: "white", textAlign: "center"}}
                      >
                        {linkBox.description}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
