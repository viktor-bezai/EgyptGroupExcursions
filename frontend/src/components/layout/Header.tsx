import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Egypt Group Excursions
        </Typography>
        <Box>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/tours" passHref>
            <Button color="inherit">Tours</Button>
          </Link>
          <Link href="/about" passHref>
            <Button color="inherit">About Us</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button color="inherit">Contact</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
