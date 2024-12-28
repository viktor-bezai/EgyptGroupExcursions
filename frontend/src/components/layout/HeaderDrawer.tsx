import React from "react";
import Link from "next/link";
import { Box, Button, Drawer, Typography } from "@mui/material";

interface HeaderDrawerProps {
  open: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({ open, onClose, navItems }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 250,
          padding: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          backgroundColor: "background.default", // Drawer background
        }}
      >
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} passHref>
            <Button
              onClick={onClose}
              sx={{
                width: 250,
                color: "white",
                backgroundColor: "primary.main",
                borderRadius: 0,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow under the button
                "&:hover": {
                  backgroundColor: "primary.dark",
                  boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)", // Slightly stronger shadow on hover
                },
              }}
            >
              <Typography variant="h6" sx={{ textDecoration: "none" }}>
                {item.label}
              </Typography>
            </Button>
          </Link>
        ))}
      </Box>
    </Drawer>
  );
};

export default HeaderDrawer;
