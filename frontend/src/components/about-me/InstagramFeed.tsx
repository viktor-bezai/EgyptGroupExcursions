import React from "react";
import { Box } from "@mui/material";
import { SocialMediaPostInterface } from "@/pages/about-me";
import SocialMediaEmbed from "./SocialMediaEmbed";
import { useEmbedScript } from "@/hooks/useEmbedScript";

interface InstagramFeedProps {
  posts: SocialMediaPostInterface[];
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts }) => {
  useEmbedScript("instagram");

  if (posts.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {posts.map((post) => (
        <SocialMediaEmbed
          key={post.id}
          html={post.oembedHtml || ""}
          platform="instagram"
        />
      ))}
    </Box>
  );
};

export default InstagramFeed;
