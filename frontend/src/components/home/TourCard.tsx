import React from "react";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {Tour} from "@/pages";

const TourCard: React.FC<{ tour: Tour }> = ({tour}) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        {tour.title}
      </Typography>
      <Typography sx={{mb: 1.5}} color="text.secondary">
        {tour.description}
      </Typography>
      <Typography variant="body2" color="text.primary">
        Cost: ${tour.cost_from} - ${tour.cost_to}
      </Typography>
      <Box mt={2}>
        <Typography
          variant="body2"
          color={tour.is_available ? "success.main" : "error.main"}
        >
          {tour.is_available ? "Available" : "Not Available"}
        </Typography>
      </Box>
      <Box mt={2} display="flex" gap={2}>
        <Button variant="contained" color="primary">
          Book Now
        </Button>
        <Button variant="contained" color="secondary">
          Details
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default TourCard;