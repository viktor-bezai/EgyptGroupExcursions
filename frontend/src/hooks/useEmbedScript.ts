import { useEffect, useRef } from "react";

type Platform = "instagram" | "tiktok";

const SCRIPT_URLS: Record<Platform, string> = {
  instagram: "https://www.instagram.com/embed.js",
  tiktok: "https://www.tiktok.com/embed.js",
};

const loadedScripts = new Set<string>();

export const useEmbedScript = (platform: Platform) => {
  const processedRef = useRef(false);

  useEffect(() => {
    const scriptUrl = SCRIPT_URLS[platform];

    const loadScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector(
        `script[src="${scriptUrl}"]`,
      );

      if (existingScript) {
        // Script exists, just process embeds
        processEmbeds();
        return;
      }

      // Create and load script
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => {
        loadedScripts.add(scriptUrl);
        processEmbeds();
      };
      document.body.appendChild(script);
    };

    const processEmbeds = () => {
      if (processedRef.current) return;

      if (platform === "instagram" && (window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
        processedRef.current = true;
      } else if (platform === "tiktok") {
        // TikTok auto-processes, but we may need to reload script
        const existingScript = document.querySelector(
          `script[src="${scriptUrl}"]`,
        );
        if (existingScript && !processedRef.current) {
          existingScript.remove();
          const newScript = document.createElement("script");
          newScript.src = scriptUrl;
          newScript.async = true;
          document.body.appendChild(newScript);
          processedRef.current = true;
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(loadScript, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [platform]);
};
