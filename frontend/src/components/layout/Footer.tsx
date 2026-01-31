import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { Instagram } from "@mui/icons-material";
import { TikTokIcon } from "@/components/common/TikTokIcon";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const socialIcons = [
    { icon: <Instagram />, href: "https://www.instagram.com/anna_egypt_/" },
    { icon: <TikTokIcon />, href: "https://www.tiktok.com/@assis_travel" },
  ];
  const { t } = useTranslation("common");

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Follow Us Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {t("follow-me")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {socialIcons.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  "& svg": {
                    fill: "white", // Default fill color
                  },
                  "&:hover svg": {
                    fill: "black", // Fill color on hover
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Copyright Section */}
        <Box
          sx={{
            textAlign: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            mt: 2,
            pt: 2,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Anna-Egypt.{" "}
            {t("all-rights-reserved", { defaultValue: "Все права защищены." })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
