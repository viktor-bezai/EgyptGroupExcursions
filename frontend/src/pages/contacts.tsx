import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ContactInfo from "@/components/contacts/ContactInfo";
import ContactForm from "@/components/contacts/ContactForm";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { GetServerSideProps } from "next";

interface ContactsProps {
  lang: string;
}

export const getServerSideProps: GetServerSideProps<ContactsProps> = async (
  context,
) => {
  const lang = context.locale || "ru";

  return {
    props: { lang },
  };
};

const Contacts = (props: ContactsProps) => {
  const { lang } = props;
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <>
      <Head>
        <title>
          {t("contacts-title", {
            defaultValue: "Contacts | Mystical Egypt Travels",
          })}
        </title>
      </Head>

      <Box
        sx={{
          width: "100%",
          mx: "auto",
          pb: 8,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {t("get-in-touch")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 4,
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          {t("have-questions")}
        </Typography>

        <Box>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <ContactInfo />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContactForm />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Contacts;
