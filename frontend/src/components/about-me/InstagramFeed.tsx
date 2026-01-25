import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { SocialMediaPostInterface } from "@/pages/about-me";

interface InstagramFeedProps {
  posts: SocialMediaPostInterface[];
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts }) => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://www.instagram.com/embed.js"]',
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [posts]);

  // Re-process embeds when posts change
  useEffect(() => {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [posts]);

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
        <Box
          key={post.id}
          sx={{
            maxWidth: 400,
            width: "100%",
          }}
          dangerouslySetInnerHTML={{ __html: post.oembedHtml || "" }}
        />
      ))}
    </Box>
  );
};

export default InstagramFeed;
