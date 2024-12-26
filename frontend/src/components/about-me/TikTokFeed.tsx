import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TikTokPost } from "@/pages/api/tiktok-feed";

const TikTokFeed: React.FC = () => {
  const [posts, setPosts] = useState<TikTokPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation("common");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/tiktok-feed");

        if (!response.ok) {
          throw new Error("Failed to fetch TikTok feed.");
        }

        const data: TikTokPost[] = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(t("Unable to load TikTok feed. Please try again later."));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {posts.map((post, index) => (
          <Grid item key={index}>
            <Card sx={{ width: 300, height: 450, borderRadius: 2, boxShadow: 3 }}>
              <CardActionArea
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={post.thumbnailUrl}
                  alt={t("tiktok-thumbnail-alt") || "TikTok Post"}
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = "/images/placeholder.jpg";
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
