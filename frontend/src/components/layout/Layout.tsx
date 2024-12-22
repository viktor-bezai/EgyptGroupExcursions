import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Box } from "@mui/material";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure the layout covers the full viewport height
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1, // Makes the content area grow and push the footer down if necessary
          p: 2, // Add padding if needed
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
