import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer: React.FC = () => {
  const socialIcons = [
    { icon: <Facebook />, href: "https://www.facebook.com" },
    { icon: <Twitter />, href: "https://www.twitter.com" },
    { icon: <Instagram />, href: "https://www.instagram.com" },
    { icon: <LinkedIn />, href: "https://www.linkedin.com" },
  ];

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
            Follow Us
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
                  "&:hover": {
                    color: "secondary.main",
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
            © {new Date().getFullYear()} Egypt Group Excursions. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
