import React from "react";
import Link from "next/link";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";


const Header: React.FC = () => {
  const navItems = [
    {label: "Home", href: "/"},
    {label: "Tours", href: "/tours"},
    {label: "About Us", href: "/about"},
    {label: "Contact", href: "/contact"},
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Egypt Group Excursions
          </Typography>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
            }}
          >
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} passHref>
                <Button color="secondary">{item.label}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;