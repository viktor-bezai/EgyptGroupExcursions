import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import HeaderDrawer from "@/components/layout/HeaderDrawer";
import Image from "next/image";
import HeaderNotifications from "@/components/layout/HeaderNotifications";
import { useNotifications } from "@/context/NotificationsContext";

const Header: React.FC = () => {
  const { notifications } = useNotifications();
  const { t } = useTranslation("common");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const navItems = [
    { label: t("tours"), href: "/tours" },
    { label: t("about-me"), href: "/about-me" },
    { label: t("contacts"), href: "/contacts" },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    router.locale?.toUpperCase() || "RU",
  );

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setAnchorEl(null);
    router.push(router.pathname, router.asPath, {
      locale: language.toLowerCase(),
    });
  };

  const [notificationsAnchor, setNotificationsAnchor] =
    useState<null | HTMLElement>(null);

  // Scroll hide/show logic
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show header at the top of the page
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide header
        setShowHeader(false);
      } else {
        // Scrolling up - show header
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const languages = [
    { code: "RU", label: "Русский" },
    { code: "UA", label: "Українська" },
    { code: "EN", label: "English" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: isMobile ? 1 : 0,
            }}
          >
            <Link href="/" passHref>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Image
                  src="/icons/logo.png"
                  alt="Mystical Egypt Travels"
                  width={50}
                  height={50}
                  priority
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Link>
          </Box>

          {/* Navigation for Desktop */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                gap: 3,
              }}
            >
              {navItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  <Link href={item.href} passHref>
                    <Button
                      color="inherit"
                      sx={{
                        px: { sm: 1, lg: 3, xl: 4 }, // Add horizontal padding for better spacing
                        py: 1, // Add vertical padding for better clickability
                        borderRadius: 2, // Smooth edges
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle hover effect
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "0.8rem", md: "1rem" },
                          fontWeight: "bold", // Make it bold for emphasis
                          textTransform: "uppercase", // Ensure uniform appearance
                          letterSpacing: 1, // Add spacing between letters for better readability
                          color: "primary.contrastText", // Use the theme's secondary color
                        }}
                      >
                        {t(item.label)}
                      </Typography>
                    </Button>
                  </Link>
                  {index < navItems.length - 1 && (
                    <Box
                      sx={{
                        height: "24px", // Adjust height to match the button height
                        width: "1px",
                        backgroundColor: "rgba(255, 255, 255, 0.5)", // Subtle divider color
                        mx: 1, // Add horizontal margin for spacing
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
          )}

          {/* Notifications */}
          {isMobile && notifications.length > 0 && (
            <HeaderNotifications
              notifications={notifications}
              notificationsAnchor={notificationsAnchor}
              handleNotificationsClick={handleNotificationsClick}
              handleNotificationsClose={handleNotificationsClose}
            />
          )}

          {/* Language Selector */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLanguageClick}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.9rem",
              px: 2,
            }}
          >
            {selectedLanguage}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageClose}
            sx={{ "& .MuiPaper-root": { minWidth: 120 } }}
          >
            {languages.map((language) => (
              <MenuItem
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                sx={{
                  fontWeight:
                    selectedLanguage === language.code ? "bold" : "normal",
                }}
              >
                {language.label}
              </MenuItem>
            ))}
          </Menu>

          {/* Hamburger Menu for Mobile */}
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <HeaderDrawer
                open={drawerOpen}
                onClose={handleDrawerToggle}
                navItems={navItems}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Spacer to prevent content from hiding behind fixed header */}
      <Toolbar />
    </>
  );
};

export default Header;
