import {Link as MUILink, Typography} from "@mui/material";
import NextLink from "next/link";
import React from "react";


interface BreadcrumbLinkProps {
  href: string;
  label: string;
  isLast?: boolean;
}

const BreadcrumbLink = (props: BreadcrumbLinkProps) => {
  const { href, label, isLast = false } = props;
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

export default BreadcrumbLink