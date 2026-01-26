import React, { useEffect, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";

interface SocialMediaEmbedProps {
  html: string;
  platform: "instagram" | "tiktok";
}

const SKELETON_HEIGHT = {
  instagram: 450,
  tiktok: 500,
};

const SocialMediaEmbed: React.FC<SocialMediaEmbedProps> = ({
  html,
  platform,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);

    const container = containerRef.current;
    if (!container) return;

    // Observe DOM changes to detect when embed is rendered
    const observer = new MutationObserver(() => {
      // Check if an iframe or rendered content exists
      const iframe = container.querySelector("iframe");
      const renderedContent =
        platform === "instagram"
          ? container.querySelector(".instagram-media-rendered")
          : container.querySelector('[data-e2e="browse-video"]');

      if (iframe || renderedContent) {
        // Add small delay for visual smoothness
        setTimeout(() => setIsLoaded(true), 100);
        observer.disconnect();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Fallback timeout in case observer doesn't trigger
    const fallbackTimeout = setTimeout(() => {
      setIsLoaded(true);
      observer.disconnect();
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimeout);
    };
  }, [html, platform]);

  return (
    <Box
      sx={{
        maxWidth: 400,
        width: "100%",
        minHeight: SKELETON_HEIGHT[platform],
        position: "relative",
      }}
    >
      {/* Skeleton - shown while loading */}
      {!isLoaded && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={SKELETON_HEIGHT[platform]}
            sx={{ borderRadius: 2 }}
            animation="wave"
          />
          <Box sx={{ pt: 1 }}>
            <Skeleton width="60%" animation="wave" />
            <Skeleton width="40%" animation="wave" />
          </Box>
        </Box>
      )}

      {/* Embed container */}
      <Box
        ref={containerRef}
        sx={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Box>
  );
};

export default SocialMediaEmbed;
