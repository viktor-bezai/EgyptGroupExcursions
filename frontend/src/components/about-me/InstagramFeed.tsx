import React from "react";
import {Box, Card, CardContent, CardMedia, Link, Typography} from "@mui/material";
import {SocialMediaPostInterface} from "@/pages/about-me";
import {truncateText} from "@/utils/textUtils";

interface InstagramFeedProps {
  posts: SocialMediaPostInterface[];
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({posts}) => {
  return (
    <Box sx={{display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center"}}>
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={post.url}
          target="_blank"
          rel="noopener"
          sx={{textDecoration: "none"}}
        >
          <Card key={index} sx={{width: 300, display: "flex", flexDirection: "column", height: 300}}>
            <CardMedia
              component="img"
              height="200"
              image={`/api/proxy-image?url=${encodeURIComponent(post.imageUrl)}`}
              alt={truncateText(post.description, 30, "Instagram post")}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/placeholder.jpg";
              }}
            />
            <CardContent
              sx={{display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between"}}
            >
              <Typography variant="body2" color="text.secondary" sx={{flexGrow: 1}}>
                {truncateText(post.description, 80, "No description available")}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default InstagramFeed;
