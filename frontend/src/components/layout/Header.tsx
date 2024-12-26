import React, {useState, useEffect} from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

const Header: React.FC = () => {
  const {t, i18n} = useTranslation("common");
  const navItems = [
    {label: t("tours"), href: "/"},
    {label: t("about-me"), href: "/about-me"},
    {label: t("contacts"), href: "/contacts"},
  ];
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale?.toUpperCase() || "RU");

  useEffect(() => {
    i18n.changeLanguage(router.locale || "ru"); // Synchronize with the current locale
  }, [router.locale, i18n]);

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
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          {t("egypt-excursions")}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 3,
          }}
        >
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} passHref>
              <Button color="secondary">
                <Typography variant="h6">
                  {t(item.label)}
                </Typography>
              </Button>
            </Link>
          ))}
        </Box>
        <Box sx={{display: "flex", alignItems: "center", gap: 1, ml: 2}}>
          <Typography variant="body1" sx={{fontWeight: 500, display: {xs: "none", sm: "block"}}}>
            {t("language")}:
          </Typography>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
