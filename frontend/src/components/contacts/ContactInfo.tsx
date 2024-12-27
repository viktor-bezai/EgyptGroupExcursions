import React from "react";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Instagram } from "@mui/icons-material";
import { TikTokIcon } from "@/components/common/TikTokIcon";
import { useTranslation } from "react-i18next";

const ContactInfo: React.FC = () => {
  const { t } = useTranslation("common");

  // Contact details
  const contactDetails = [
    { icon: <EmailIcon />, text: "contact@example.com" },
    { icon: <PhoneIcon />, text: "+1 (123) 456-7890" },
    { icon: <LocationOnIcon />, text: "123 Main Street, Toronto, Canada" },
  ];

  // Social links
  const socialLinks = [
    {
      icon: <Instagram />,
      href: "https://www.instagram.com/anna_egypt_/",
    },
    {
      icon: <TikTokIcon />,
      href: "https://www.tiktok.com/@assis_travel",
    },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
        {t("contact-information")}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Contact Details */}
      {contactDetails.map((detail, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          {detail.icon}
          <Typography variant="body1">{detail.text}</Typography>
        </Box>
      ))}

      {/* Social Links */}
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        {socialLinks.map((link, index) => (
          <IconButton
            key={index}
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "text.primary",
              "&:hover": {
                color: "secondary.main",
              },
            }}
          >
            {link.icon}
          </IconButton>
        ))}
      </Box>
    </Paper>
  );
};

export default ContactInfo;
