import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { truncateText } from "@/utils/textUtils";
import { useTranslation } from "react-i18next";
import { InstagramPost } from "@/pages/api/instagram-feed";

const InstagramFeed: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation("common");

  useEffect(() => {
    let isMounted = true; // To prevent setting state on unmounted component

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/instagram-feed");
        if (!response.ok) {
          throw new Error("Failed to fetch Instagram feed.");
        }
        const data: InstagramPost[] = await response.json();
        if (isMounted) setPosts(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setError(t("error-fetching-instagram-feed") || "Unable to load Instagram feed. Please try again later.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [t]);

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
            <Card sx={{ width: 300, height: 400, borderRadius: 2, boxShadow: 3 }}>
              <CardActionArea
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={`/api/proxy-image?url=${encodeURIComponent(post.imageUrl)}`}
                  alt={post.altText || t("instagram-post-alt")}
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = "/images/placeholder.jpg";
                  }}
                  sx={{ objectFit: "cover" }}
                />
              </CardActionArea>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {truncateText(post.description || t("no-post-description"), 100)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InstagramFeed;
