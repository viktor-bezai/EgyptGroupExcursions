import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const ContactForm: React.FC = () => {
  const { t } = useTranslation("common");
  const [preferredContact, setPreferredContact] = useState("");
  const [contactLink, setContactLink] = useState("");

  const handlePreferredContactChange = (event: SelectChangeEvent<string>) => {
    setPreferredContact(event.target.value);
  };

  const handleContactLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactLink(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
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

          <Grid item xs={12} sm={6}>
            <Select
              value={preferredContact}
              onChange={handlePreferredContactChange}
              displayEmpty
              fullWidth
              variant="outlined"
              required
            >
              <MenuItem value="" disabled>
                {t("select-contact-type")}
              </MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="viber">Viber</MenuItem>
              <MenuItem value="whatsapp">WhatsApp</MenuItem>
              <MenuItem value="telegram">Telegram</MenuItem>
              <MenuItem value="instagram">Instagram</MenuItem>
              <MenuItem value="tiktok">TikTok</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("your-contact")}
              fullWidth
              variant="outlined"
              value={contactLink}
              onChange={handleContactLinkChange}
              required
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
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button variant="contained" color="primary" size="large">
            {t("submit")}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ContactForm;
