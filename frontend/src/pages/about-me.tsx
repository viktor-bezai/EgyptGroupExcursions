import React, {useState} from "react";
import {Box, Button, ButtonGroup} from "@mui/material";
import {Instagram} from "@mui/icons-material";
import {TikTokIconWithBackground} from "@/components/common/TikTokIcon";
import TikTokFeed from "@/components/about-me/TikTokFeed";
import InstagramFeed from "@/components/about-me/InstagramFeed";
import {GetServerSideProps} from "next";
import {fetchAboutMePageData} from "@/utils/api";
import Head from "next/head";

export interface SocialMediaPostInterface {
  id: number;
  imageUrl: string;
  description: string | null;
  url: string;
  postDate: string | null;
  socialMedia: string;
}

interface AboutMeProps {
  socialMediaPosts: SocialMediaPostInterface[];
}

export const getServerSideProps: GetServerSideProps<AboutMeProps> = async () => {
  const data = await fetchAboutMePageData();

  const socialMediaPosts: SocialMediaPostInterface[] = data?.socialMediaPosts || [];

  return {
    props: {socialMediaPosts},
  };
};

const AboutMe = (props: AboutMeProps) => {
  const {socialMediaPosts} = props;

  const instagramPosts = socialMediaPosts.filter(
    (post) => post.socialMedia.toLowerCase() === "instagram"
  );
  const tikTokPosts = socialMediaPosts.filter(
    (post) => post.socialMedia.toLowerCase() === "tiktok"
  );

  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

  return (
    <>
      <Head>
        <title>About Me | Egypt Tours</title>
      </Head>

      <Box sx={{p: 4, width: "80%", mx: "auto"}}>
        {/* Button Group */}
        <Box sx={{mb: 4, display: "flex", justifyContent: "center"}}>
          <ButtonGroup variant="contained" color="primary">
            <Button
              onClick={() => setSelectedPlatform("instagram")}
              variant={selectedPlatform === "instagram" ? "contained" : "outlined"}
              fullWidth
              startIcon={<Instagram/>} // Instagram icon on the left
            >
              Instagram
            </Button>
            <Button
              onClick={() => setSelectedPlatform("tiktok")}
              variant={selectedPlatform === "tiktok" ? "contained" : "outlined"}
              fullWidth
              endIcon={<TikTokIconWithBackground/>}
            >
              TikTok
            </Button>
          </ButtonGroup>
        </Box>

        {/* Dynamic Content */}
        <Box sx={{display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 4}}>
          {selectedPlatform === "instagram" ? (
            <Box sx={{flex: 1}}>
              <InstagramFeed posts={instagramPosts}/>
            </Box>
          ) : (
            <Box sx={{flex: 1}}>
              <TikTokFeed posts={tikTokPosts}/>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AboutMe;
