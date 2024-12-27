import React from "react";
import {Box, Card, CardMedia, CardContent, Typography, Link} from "@mui/material";
import {SocialMediaPostInterface} from "@/pages/about-me";

interface InstagramFeedProps {
  posts: SocialMediaPostInterface[];
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({posts}) => {
  return (
    <Box sx={{display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center"}}>
      {posts.map((post, index) => (
        <Card key={index} sx={{width: 300}}>
          <CardMedia
            component="img"
            height="200"
            image={`/api/proxy-image?url=${encodeURIComponent(post.imageUrl)}`}
            alt={post.description || "Instagram post"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/placeholder.jpg";
            }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.description || "No description available"}
            </Typography>
            <Link href={post.url} target="_blank" rel="noopener" sx={{display: "block", mt: 1}}>
              View Post
            </Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default InstagramFeed;
