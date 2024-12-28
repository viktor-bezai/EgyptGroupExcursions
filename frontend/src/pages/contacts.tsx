import React from "react";
import {Box, Grid, Typography,} from "@mui/material";
import ContactInfo from "@/components/contacts/ContactInfo";
import ContactForm from "@/components/contacts/ContactForm";
import {useTranslation} from "react-i18next";
import Head from "next/head";


const Contacts: React.FC = () => {
  const {t} = useTranslation("common");

  return (
    <>
      <Head>
        <title>Contacts | Mystical Egypt Travels</title>
      </Head>

      <Box
        sx={{
          width: "100%",
          mx: "auto",
          py: 8,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{fontWeight: 600}}>
          {t("get-in-touch")}
        </Typography>
        <Typography
          variant="body1"
          sx={{color: "text.secondary", mb: 4, maxWidth: 600, textAlign: "center"}}
        >
          {t("have-questions")}
        </Typography>

        <Box>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <ContactInfo/>
            </Grid>
            <Grid item xs={12} md={6}>
              <ContactForm/>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
};

export default Contacts;
