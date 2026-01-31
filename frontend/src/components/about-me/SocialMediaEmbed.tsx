import React, { useEffect, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";

interface SocialMediaEmbedProps {
  html: string;
  platform: "instagram" | "tiktok";
  onLoad?: () => void;
}

const SKELETON_HEIGHT = {
  instagram: 450,
  tiktok: 750,
};

const FALLBACK_TIMEOUT = {
  instagram: 5000,
  tiktok: 8000,
};

const SocialMediaEmbed: React.FC<SocialMediaEmbedProps> = React.memo(
  ({ html, platform, onLoad }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const onLoadRef = useRef(onLoad);
    onLoadRef.current = onLoad;

    useEffect(() => {
      setIsLoaded(false);

      const container = containerRef.current;
      if (!container) return;

      // Observe DOM changes to detect when embed is rendered
      const observer = new MutationObserver(() => {
        // Instagram adds this class after fully processing
        const instagramRendered = container.querySelector(
          ".instagram-media-rendered",
        );
        // Check for iframe with actual dimensions (means it's loaded)
        const iframe = container.querySelector("iframe");
        const iframeReady = iframe && iframe.offsetHeight > 100;

        if (instagramRendered || iframeReady) {
          // Add delay to ensure content is fully visible
          setTimeout(() => {
            setIsLoaded(true);
            onLoadRef.current?.();
          }, 300);
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
        onLoadRef.current?.();
        observer.disconnect();
      }, FALLBACK_TIMEOUT[platform]);

      return () => {
        observer.disconnect();
        clearTimeout(fallbackTimeout);
      };
    }, [html, platform]);

    const isTikTok = platform === "tiktok";
    const skeletonHeight = SKELETON_HEIGHT[platform];

    return (
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: isTikTok ? 325 : 400 },
          width: "100%",
          // Use fixed height while loading to prevent overlap, auto when loaded
          height: isLoaded ? "auto" : skeletonHeight + 50, // +50 for text skeletons
          minHeight: skeletonHeight,
          position: "relative",
          // Ensure embeds scale properly
          "& iframe": {
            maxWidth: "100%",
            width: "100% !important",
            // TikTok: set fixed height to prevent scrolling
            ...(isTikTok && {
              height: "750px !important",
            }),
          },
          "& .instagram-media, & blockquote": {
            maxWidth: "100% !important",
            minWidth: "unset !important",
            width: "100% !important",
            margin: "0 auto !important",
          },
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
            height: isLoaded ? "auto" : 0,
            overflow: "hidden",
            transition: "opacity 0.3s ease-in-out",
          }}
          dangerouslySetInnerHTML={{
            __html: html.replace(/<script[^>]*>.*?<\/script>/gi, ""),
          }}
        />
      </Box>
    );
  },
);

SocialMediaEmbed.displayName = "SocialMediaEmbed";

export default SocialMediaEmbed;
