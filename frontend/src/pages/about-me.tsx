import React, {useState} from "react";
import {Box, Button, ButtonGroup} from "@mui/material";
import InstagramFeed from "@/components/about-me/InstagramFeed";
import TikTokEmbed from "@/components/about-me/TikTokEmbed";

const AboutMe: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

  return (
    <Box sx={{p: 4, width: "80%", mx: "auto"}}>
      {/* Button Group */}
      <Box sx={{mb: 4, display: "flex", justifyContent: "center"}}>
        <ButtonGroup variant="contained" color="primary">
          <Button
            onClick={() => setSelectedPlatform("instagram")}
            variant={selectedPlatform === "instagram" ? "contained" : "outlined"}
            fullWidth
          >
            Instagram
          </Button>
          <Button
            onClick={() => setSelectedPlatform("tiktok")}
            variant={selectedPlatform === "tiktok" ? "contained" : "outlined"}
            fullWidth
          >
            TikTok
          </Button>
        </ButtonGroup>
      </Box>

      {/* Dynamic Content */}
      <Box sx={{display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 4}}>
        {selectedPlatform === "instagram" ? (
          <Box sx={{flex: 1}}>
            <InstagramFeed/>
          </Box>
        ) : (
          <Box sx={{flex: 1}}>
            <TikTokEmbed/>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AboutMe;
