import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { SocialMediaPostInterface } from "@/pages/about-me";

interface TikTokFeedProps {
  posts: SocialMediaPostInterface[];
}

const TikTokFeed: React.FC<TikTokFeedProps> = ({ posts }) => {
  useEffect(() => {
    // Load TikTok embed script
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://www.tiktok.com/embed.js"]',
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Re-process embeds when posts change
  useEffect(() => {
    // TikTok's embed script auto-processes, but we can trigger a re-render
    const script = document.querySelector(
      'script[src="https://www.tiktok.com/embed.js"]',
    );
    if (script) {
      script.remove();
      const newScript = document.createElement("script");
      newScript.src = "https://www.tiktok.com/embed.js";
      newScript.async = true;
      document.body.appendChild(newScript);
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

export default TikTokFeed;
