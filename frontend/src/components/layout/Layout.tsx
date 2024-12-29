import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {Box} from "@mui/material";
import {useFetchNotifications} from "@/hooks/useFetchNotifications";

interface LayoutProps {
  children: React.ReactNode;
  lang: string;
}

const Layout: React.FC<LayoutProps> = ({children, lang}) => {
  useFetchNotifications(lang);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 2,
        }}
      >
        {children}
      </Box>

      <Footer/>
    </Box>
  );
};

export default Layout;
