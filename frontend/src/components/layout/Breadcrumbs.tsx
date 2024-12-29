import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs as MUIBreadcrumbs, Link as MUILink, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Tour } from "@/pages/tours";
import { fetchTourBySlug } from "@/pages/api/tours";
import {useTranslation} from "react-i18next";

interface BreadcrumbLinkProps {
  href: string;
  label: string;
  isLast?: boolean;
}

const BreadcrumbLink = (props: BreadcrumbLinkProps) => {
  const { href, label, isLast = false } = props
  return isLast ? (
    <Typography
      color="primary.main"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {label}
    </Typography>
  ) : (
    <MUILink
      component={NextLink}
      href={href}
      underline="hover"
      color="primary.main"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {label}
    </MUILink>
  );
};

const Breadcrumbs: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [dynamicTitle, setDynamicTitle] = useState<string | null>(null);

  const pathArray = router.asPath.split("/").filter((path) => path);

  // Dynamically generate the breadcrumb map using translations
  const breadcrumbMap: Record<string, string> = {
    "about-me": t("about-me"),
    contacts: t("contacts"),
    tours: t("tours"),
  };

  const capitalizeWords = (str: string): string =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const getBreadcrumbLabel = (path: string, index: number) => {
    // Fetch dynamic title for `/tours/{slug}`
    if (pathArray[0] === "tours" && index === 1 && dynamicTitle) {
      return dynamicTitle;
    }
    return capitalizeWords(breadcrumbMap[path] || path.replace(/-/g, " "));
  };

  useEffect(() => {
    // Fetch dynamic title only for `/tours/{slug}` paths
    if (pathArray[0] === "tours" && pathArray.length > 1) {
      const slug = pathArray[1];
      fetchTourBySlug(slug)
        .then((data: Tour) => setDynamicTitle(data.title))
        .catch((error: string) => console.error("Error fetching tour title:", error));
    }
  }, [pathArray]);

  return (
    <Box sx={{ mx: 2, mt: 2, display: "flex", alignItems: "center" }}>
      <MUIBreadcrumbs
        aria-label="breadcrumb"
        separator={<ChevronRightIcon fontSize="small" sx={{ color: "text.secondary" }} />}
        sx={{
          "& .MuiBreadcrumbs-separator": {
            mx: 0.5,
          },
        }}
      >
        {/* Home Link */}
        <MUILink
          component={NextLink}
          href="/"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            textDecoration: "none",
            color: "black",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          <HomeIcon
            sx={{
              mr: 0.5,
              fontSize: "1.2rem",
              color: "primary.main",
            }}
          />
        </MUILink>

        {/* Dynamic Breadcrumbs */}
        {pathArray.map((path, index) => {
          const isLast = index === pathArray.length - 1;
          const href = `/${pathArray.slice(0, index + 1).join("/")}`;
          const label = getBreadcrumbLabel(path, index);

          return <BreadcrumbLink key={href} href={href} label={label} isLast={isLast} />;
        })}
      </MUIBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
