import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

interface TikTokIconProps {
  color?: string; // Optional color prop
}

export const TikTokIcon: React.FC<TikTokIconProps> = ({ color = "secondary.main" }) => {
  const theme = useTheme();

  const resolveColor = (color: string): string => {
    const [paletteKey, shade] = color.split(".");
    const palette = theme.palette as Record<string, any>;

    if (paletteKey in palette) {
      const paletteColor = palette[paletteKey];
      if (typeof paletteColor === "object" && shade && shade in paletteColor) {
        return paletteColor[shade];
      }
      if (typeof paletteColor === "string") {
        return paletteColor;
      }
    }
    return color; // Fallback to raw color
  };

  const resolvedColor = resolveColor(color);

  return (
    <svg
      fill={resolvedColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="24px"
      height="24px"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

export const TikTokIconWithBackground: React.FC = () => (
  <Box
    sx={{
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      borderRadius: "10%"
    }}
  >
    <TikTokIcon color="primary.main" />
  </Box>
);
