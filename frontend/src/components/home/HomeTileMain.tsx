import Link from "next/link";
import {Box, Typography} from "@mui/material";

interface HomeTileMainProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const HomeTileMain = ({title, description, image, link}: HomeTileMainProps) => {

  return (
    <Link href={link} passHref>
      <Box
        sx={{
          mx: "auto",
          position: "relative",
          minHeight: {xs: 350, md: 450, lg: 500, xl: 700},
          minWidth: {md: 150, xl: 250},
          borderRadius: 1,
          overflow: "hidden",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
          transition: "filter 0.3s, background-color 0.3s",
          filter: {md: "brightness(0.5)"},
          "&:hover": {
            filter: "brightness(1)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            p: 2,
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: {xs: "1.1rem", sm: "1rem", md: "0.7rem", lg: "0.9rem", xl: "1.25rem"}
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
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              p: 2,
            }}
          >
            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                fontSize: {xs: "0.9rem", sm: "0.75rem", lg: "0.9rem", xl: "1rem"}
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  )
};

export default HomeTileMain;
