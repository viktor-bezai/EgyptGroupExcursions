import sanitizeHtml from "sanitize-html";
import React from "react";
import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export const truncateText = (htmlString: string | null, length: number, alterText: string): string => {
  if (!htmlString) {
    return alterText;
  }

  const sanitizedString = sanitizeHtml(htmlString, {
    allowedTags: [],
    allowedAttributes: {},
  });

  // Truncate sanitized string
  return sanitizedString.length > length ? `${sanitizedString.slice(0, length)}...` : sanitizedString;
};

// Description Renderer
export const DescriptionRenderer: React.FC<{ description: string }> = ({description}) => {
  const theme = useTheme();

  // Function to process the content
  const processContent = (content: string): string => {
    const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "";

    // Match and update image src attributes
    const updatedContent = content.replace(
      /<img[^>]+src="\/media\/ckeditor\/([^"]+)"/g,
      `<img src="${mediaUrl}/media/ckeditor/$1"`
    );

    // Match TikTok video links (if needed)
    const tiktokRegex = /https?:\/\/(?:www\.)?tiktok\.com\/(?:@[\w.-]+\/video\/|v\/|embed\/)(\d+)(?:\?.*)?/g;
    const finalContent = updatedContent.replace(tiktokRegex, (match, videoId) => {
      return `
        <div style="margin: 1em 0; position: relative; padding-bottom: 101%; height: 0; overflow: hidden;">
          <iframe 
            src="https://www.tiktok.com/embed/${videoId}" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
            allowfullscreen
            title="TikTok Video">
          </iframe>
        </div>`;
    });

    return finalContent;
  };

  return (
    <Box
      dangerouslySetInnerHTML={{__html: processContent(description)}}
      sx={{
        mb: {xs: 2, md: 4},
        p: {xs: 1, md: 2},
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
        },
        "& a": {color: theme.palette.primary.main, textDecoration: "none"},
        "& .image-style-align-left": {
          float: "left",
          marginRight: 2,
          marginBottom: 2,
          maxWidth: "50%",
        },
        "& .image-style-align-right": {
          float: "right",
          marginLeft: 16,
          marginBottom: 16,
          maxWidth: "50%",
        },
        "& .image-style-align-center": {
          display: "block",
          margin: "auto",
        },
        "&:after": {
          content: '""',
          display: "block",
          clear: "both",
        },
      }}
    />
  );
};

