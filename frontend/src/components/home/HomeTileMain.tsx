import Link from "next/link";
import { Box, Typography } from "@mui/material";

interface HomeTileMainProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const HomeTileMain = ({
  title,
  description,
  image,
  link,
}: HomeTileMainProps) => {
  return (
    <Link href={link} passHref>
      <Box
        sx={{
          mx: "auto",
          position: "relative",
          minHeight: { xs: 300, md: 450, lg: 500, xl: 700 },
          minWidth: { md: 150, xl: 250 },
          borderRadius: { xs: 2, md: 1 },
          overflow: "hidden",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
          transition: "filter 0.3s, background-color 0.3s",
          filter: { md: "brightness(0.5)" },
          "&:hover": {
            filter: "brightness(1)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: { xs: "rgba(0, 0, 0, 0.8)", md: "transparent" },
            zIndex: 1,
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            p: { xs: 1, md: 2 },
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2, // Ensures the text appears above the overlay
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: {
                xs: "1.1rem",
                sm: "1rem",
                md: "0.7rem",
                lg: "0.9rem",
                xl: "1.25rem",
              },
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2, // Ensures the text appears above the overlay
          }}
        >
          <Box
            sx={{
              backgroundColor: { xs: "none", md: "rgba(0, 0, 0, 0.7)" },
              p: 2,
            }}
          >
            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                fontSize: {
                  xs: "0.9rem",
                  sm: "0.75rem",
                  lg: "0.9rem",
                  xl: "1rem",
                },
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default HomeTileMain;
