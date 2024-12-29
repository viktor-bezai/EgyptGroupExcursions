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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferredContact: "",
    contactLink: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    preferredContact: "",
    contactLink: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePreferredContactChange = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      preferredContact: event.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      preferredContact: "",
    }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {
      firstName: "",
      lastName: "",
      preferredContact: "",
      contactLink: "",
      message: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("first-name-required");
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("last-name-required");
    }
    if (!formData.preferredContact) {
      newErrors.preferredContact = t("contact-type-required");
    }
    if (formData.preferredContact === "email" && !/^\S+@\S+\.\S+$/.test(formData.contactLink)) {
      newErrors.contactLink = t("valid-email-required");
    } else if (!formData.contactLink.trim()) {
      newErrors.contactLink = t("contact-link-required");
    }
    if (!formData.message.trim()) {
      newErrors.message = t("message-required");
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message.");
      }

      setSuccess(t("message-sent-successfully"));
      setFormData({
        firstName: "",
        lastName: "",
        preferredContact: "",
        contactLink: "",
        message: "",
      });
    } catch {
      setError(t("message-send-error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
        {t("contact-form")}
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label={t("first-name")}
              fullWidth
              variant="outlined"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label={t("last-name")}
              fullWidth
              variant="outlined"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handlePreferredContactChange}
              displayEmpty
              fullWidth
              variant="outlined"
              required
              error={!!errors.preferredContact}
              sx={{ width: "100%" }}
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
            {errors.preferredContact && (
              <Typography color="error" variant="caption">
                {errors.preferredContact}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="contactLink"
              label={t("your-contact")}
              fullWidth
              variant="outlined"
              value={formData.contactLink}
              onChange={handleInputChange}
              required
              error={!!errors.contactLink}
              helperText={errors.contactLink}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="message"
              label={t("message")}
              fullWidth
              variant="outlined"
              required
              multiline
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              error={!!errors.message}
              helperText={errors.message}
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          {error && <Typography mb={1} color="error">{error}</Typography>}
          {success && <Typography mb={1} color="success.main">{success}</Typography>}
          <Button variant="contained" color="primary" size="large" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("sending") : t("submit")}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ContactForm;
