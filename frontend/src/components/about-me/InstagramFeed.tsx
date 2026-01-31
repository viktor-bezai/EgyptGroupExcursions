import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { SocialMediaPostInterface } from "@/pages/about-me";
import SocialMediaEmbed from "./SocialMediaEmbed";
import { useEmbedScript } from "@/hooks/useEmbedScript";

const BATCH_SIZE = 3;

interface InstagramFeedProps {
  posts: SocialMediaPostInterface[];
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts }) => {
  useEmbedScript("instagram");

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loadedInBatch = useRef(0);
  const currentBatchSize = useRef(Math.min(BATCH_SIZE, posts.length));

  const handleEmbedLoaded = useCallback(() => {
    loadedInBatch.current += 1;

    if (loadedInBatch.current >= currentBatchSize.current) {
      setVisibleCount((prev) => {
        const next = Math.min(prev + BATCH_SIZE, posts.length);
        loadedInBatch.current = 0;
        currentBatchSize.current = next - prev;
        return next;
      });
    }
  }, [posts.length]);

  // Re-process Instagram embeds when a new batch is rendered
  useEffect(() => {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [visibleCount]);

  if (posts.length === 0) {
    return null;
  }

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 2, sm: 3 },
        justifyContent: "center",
      }}
    >
      {visiblePosts.map((post) => (
        <SocialMediaEmbed
          key={post.id}
          html={post.oembedHtml || ""}
          platform="instagram"
          onLoad={handleEmbedLoaded}
        />
      ))}
    </Box>
  );
};

export default InstagramFeed;
