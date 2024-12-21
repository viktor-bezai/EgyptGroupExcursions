import React, { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleDrawer = (open: boolean) => () => {
    setMenuOpen(open);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* AppBar with Menu Icon */}
      <AppBar position="static">
        <Toolbar>
          {/* SideMenu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: 'auto' }}>
            Egypt Group Excursions
          </Typography>

          {/* Centered Navigation Links */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
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

      {/* SideMenu Component */}
      <SideMenu isOpen={menuOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Header;
