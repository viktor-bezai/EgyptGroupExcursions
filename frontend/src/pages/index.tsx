import { GetServerSideProps } from "next";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Grid } from "@mui/system";

interface Tour {
  id: number;
  title: string;
  description: string;
  cost_from: number;
  cost_to: number;
  is_available: boolean;
}

export default function Home({ tours }: { tours: Tour[] }) {
  return (
    <div className="text-center">
      <Typography variant="h3" gutterBottom>
        Available Tours
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {tours.map((tour) => (
          <Grid xs={12} sm={6} md={4} key={tour.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {tour.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {tour.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Cost: ${tour.cost_from} - ${tour.cost_to}
                </Typography>
                <>
                  {tour.is_available ? (
                    <Typography variant="body2" color="success.main">
                      Available
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="error.main">
                      Not Available
                    </Typography>
                  )}
                </>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Book Now
                </Button>
                <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                  Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/tours/");
    const tours = await res.json();

    return { props: { tours } };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { props: { tours: [] } };
  }
};
