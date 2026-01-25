import React, { useState, useCallback } from "react";
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
import { Tour } from "@/pages/tours";

interface ContactFormProps {
  tour?: Tour;
  onClose?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ tour, onClose }) => {
  const { t } = useTranslation("common");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferredContact: "",
    contactLink: "",
    message: "",
    tour,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [],
  );

  const handlePreferredContactChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setFormData((prev) => ({
        ...prev,
        preferredContact: event.target.value,
      }));
      setErrors((prev) => ({ ...prev, preferredContact: "" }));
    },
    [],
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("first-name-required");
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("last-name-required");
    }
    if (!formData.preferredContact) {
      newErrors.preferredContact = t("contact-type-required");
    }
    if (
      formData.preferredContact === "email" &&
      !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData.contactLink)
    ) {
      newErrors.contactLink = t("valid-email-required");
    } else if (!formData.contactLink.trim()) {
      newErrors.contactLink = t("contact-link-required");
    }
    if (!formData.message.trim()) {
      newErrors.message = t("message-required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFeedbackMessage(null);

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || t("message-send-error"));
        }

        setFeedbackMessage({
          type: "success",
          message: t("message-sent-successfully"),
        });
        setFormData((prev) => ({
          ...prev,
          firstName: "",
          lastName: "",
          preferredContact: "",
          contactLink: "",
          message: "",
        }));
      } catch (err: any) {
        setFeedbackMessage({ type: "error", message: err.message });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, t, validateForm],
  );

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 900 }}>
      {!onClose && (
        <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
          {t("contact-form")}
        </Typography>
      )}

      {tour && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">{tour.title}</Typography>
        </Box>
      )}

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
              sx={{ boxSizing: "border-box" }}
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
              sx={{ boxSizing: "border-box" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handlePreferredContactChange}
              displayEmpty
              fullWidth
              required
              error={!!errors.preferredContact}
              sx={{
                boxSizing: "border-box",
              }}
            >
              <MenuItem value="" disabled>
                {t("select-contact-type")}
              </MenuItem>
              {[
                "Email",
                "Viber",
                "Whatsapp",
                "Telegram",
                "Instagram",
                "Tiktok",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {t(option)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="contactLink"
              label={t("your-contact")}
              fullWidth
              variant="outlined"
              required
              value={formData.contactLink}
              onChange={handleInputChange}
              error={!!errors.contactLink}
              helperText={errors.contactLink}
              sx={{ boxSizing: "border-box" }}
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
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              error={!!errors.message}
              helperText={errors.message}
              sx={{
                boxSizing: "border-box",
                maxWidth: "100%",
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          {feedbackMessage && (
            <Typography
              mb={2}
              color={
                feedbackMessage.type === "success" ? "success.main" : "error"
              }
            >
              {feedbackMessage.message}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("sending") : t("submit")}
          </Button>
          {onClose && (
            <Button
              variant="outlined"
              size="large"
              onClick={onClose}
              sx={{ ml: 2 }}
            >
              {t("cancel")}
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default ContactForm;
