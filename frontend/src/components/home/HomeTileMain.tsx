import Link from "next/link";
import {Box, Typography} from "@mui/material";

interface HomeTileMainProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const HomeTileMain = (props: HomeTileMainProps) => {
  const {title, description, image, link} = props

  return (
    <Link href={link} passHref>
      <Box
        sx={{
          mx: "auto",
          position: "relative",
          minHeight: 450,
          minWidth: 200,
          borderRadius: 2,
          overflow: "hidden",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
          transition: "filter 0.3s, background-color 0.3s",
          filter: "brightness(0.5)",
          "&:hover": {
            filter: "brightness(0.9)",
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
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
          <Typography
            variant="body1"
            sx={{
              color: "white",
              textAlign: "center",
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
};

export default HomeTileMain;
