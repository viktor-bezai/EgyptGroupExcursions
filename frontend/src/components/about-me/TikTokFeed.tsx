import React from "react";
import { Box, Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SocialMediaPostInterface } from "@/pages/about-me";

interface TikTokFeedProps {
  posts: SocialMediaPostInterface[];
}

const TikTokFeed: React.FC<TikTokFeedProps> = ({ posts }) => {
  const { t } = useTranslation("common");

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {posts.map((post, index) => (
          <Grid item key={index}>
            <Card
              sx={{ width: 300, height: 450, borderRadius: 2, boxShadow: 3 }}
            >
              <CardActionArea
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={`/api/proxy-image?url=${encodeURIComponent(post.imageUrl)}`}
                  alt={
                    post.description ||
                    t("tiktok-thumbnail-alt") ||
                    "TikTok Post"
                  }
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = "/images/placeholder_tiktok.webp";
                  }}
                  sx={{ objectFit: "cover" }}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TikTokFeed;
