import React, {useEffect, useState} from "react";
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
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import HeaderDrawer from "@/components/layout/HeaderDrawer";

const Header: React.FC = () => {
  const {t, i18n} = useTranslation("common");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const navItems = [
    {label: t("tours"), href: "/"},
    {label: t("about-me"), href: "/about-me"},
    {label: t("contacts"), href: "/contacts"},
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale?.toUpperCase() || "RU");

  useEffect(() => {
    i18n.changeLanguage(router.locale || "ru");
  }, [router.locale, i18n]);

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
    router.push(router.pathname, router.asPath, {locale: language.toLowerCase()});
  };

  const languages = [
    {code: "RU", label: "Русский"},
    {code: "UKR", label: "Українська"},
    {code: "EN", label: "English"},
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo or Title */}
        <Typography variant="h6" component="div" sx={{flexGrow: isMobile ? 1 : 0}}>
          {t("egypt-excursions")}
        </Typography>

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
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} passHref>
                <Button color="secondary">
                  <Typography variant="h6">{t(item.label)}</Typography>
                </Button>
              </Link>
            ))}
          </Box>
        )}

        {/* Language Selector */}
        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
          {!isMobile && (
            <Typography variant="body1" sx={{fontWeight: 500}}>
              {t("language")}:
            </Typography>
          )}
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLanguageClick}
            sx={{textTransform: "none", fontWeight: "bold", fontSize: "0.9rem", px: 2}}
          >
            {selectedLanguage}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageClose}
            sx={{"& .MuiPaper-root": {minWidth: 120}}}
          >
            {languages.map((language) => (
              <MenuItem
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                sx={{
                  fontWeight: selectedLanguage === language.code ? "bold" : "normal",
                }}
              >
                {language.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Hamburger Menu for Mobile */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon/>
            </IconButton>
            <HeaderDrawer open={drawerOpen} onClose={handleDrawerToggle} navItems={navItems}/>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
