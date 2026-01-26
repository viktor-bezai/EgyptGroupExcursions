import React from "react";
import { Box } from "@mui/material";
import { SocialMediaPostInterface } from "@/pages/about-me";
import SocialMediaEmbed from "./SocialMediaEmbed";
import { useEmbedScript } from "@/hooks/useEmbedScript";

interface TikTokFeedProps {
  posts: SocialMediaPostInterface[];
}

const TikTokFeed: React.FC<TikTokFeedProps> = ({ posts }) => {
  useEmbedScript("tiktok");

  if (posts.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 2, sm: 3 },
        justifyContent: "center",
      }}
    >
      {posts.map((post) => (
        <SocialMediaEmbed
          key={post.id}
          html={post.oembedHtml || ""}
          platform="tiktok"
        />
      ))}
    </Box>
  );
};

export default TikTokFeed;
