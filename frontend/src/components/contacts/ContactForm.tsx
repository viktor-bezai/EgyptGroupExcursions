import React from "react";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const ContactForm: React.FC = () => {
  const {t} = useTranslation("common");

  return <Paper elevation={3} sx={{padding: 3}}>
    <Typography variant="h5" sx={{fontWeight: 500, mb: 2}}>
      {t("contact-form")}
    </Typography>
    <form noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("first-name")}
            fullWidth
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("last-name")}
            fullWidth
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("email-address")}
            fullWidth
            variant="outlined"
            required
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("message")}
            fullWidth
            variant="outlined"
            required
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
      <Box sx={{mt: 3, textAlign: "center"}}>
        <Button variant="contained" color="primary" size="large">
          Submit
        </Button>
      </Box>
    </form>
  </Paper>
};

export default ContactForm;