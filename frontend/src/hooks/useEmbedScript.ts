import { useEffect } from "react";

type Platform = "instagram" | "tiktok";

const SCRIPT_URLS: Record<Platform, string> = {
  instagram: "https://www.instagram.com/embed.js",
  tiktok: "https://www.tiktok.com/embed.js",
};

export const useEmbedScript = (platform: Platform) => {
  useEffect(() => {
    const scriptUrl = SCRIPT_URLS[platform];

    const loadScript = () => {
      if (platform === "instagram") {
        // Instagram: check if script exists and process, or load new
        const existingScript = document.querySelector(
          `script[src="${scriptUrl}"]`,
        );

        if (existingScript && (window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
          return;
        }

        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => {
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        };
        document.body.appendChild(script);
      } else if (platform === "tiktok") {
        // TikTok: always remove and reload script for SPA navigation
        const existingScript = document.querySelector(
          `script[src*="tiktok.com/embed"]`,
        );
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        document.body.appendChild(script);
      }
    };

    // Delay to ensure DOM with blockquotes is ready
    const timeoutId = setTimeout(loadScript, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [platform]);
};
