import React from 'react';
import Link from 'next/link';
import { Drawer, Box, List, ListItem, ListItemText } from '@mui/material';

interface SideMenuProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, toggleDrawer }) => {
  const menuItems = [
    { label: 'Group Excursions', href: '/group-excursions' },
    { label: 'Individual Excursions', href: '/individual-excursions' },
    { label: 'Yacht Trips', href: '/yacht-trips' },
  ];

  // Header height (adjust as needed)
  const headerHeight = 64;

  // SideMenu width
  const sideMenuWidth = 320;

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          top: `${headerHeight}px`,
          height: `calc(100% - ${headerHeight}px)`,
          width: `${sideMenuWidth}px`,
        },
      }}
    >
      <Box
        sx={{
          width: `${sideMenuWidth}px`,
          height: '100%',
          bgcolor: 'background.default',
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} passHref>
              <ListItem
                component="a"
                sx={{
                  px: 3,
                  py: 2,
                  borderRadius: 1,
                  textDecoration: 'none', // Remove underline for ListItem
                  color: 'secondary.main', // Apply secondary text color
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                  }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
