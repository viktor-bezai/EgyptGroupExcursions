import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { fetchWeather, fetchForecast } from "@/utils/openweatherApi";
import { useTranslation } from "react-i18next"; // Assuming `fetchForecast` is defined

type WeatherDataDescriprion = {
  description: string;
  icon: string;
  main: string;
};

type WeatherData = {
  hurghada: {
    main: {
      feels_like: number;
      humidity: number;
      temp: number;
    };
    weather: WeatherDataDescriprion[];
  };
  sharm: {
    main: { temp: number };
    weather: { description: string }[];
  };
};

type ForecastData = {
  dt: number;
  main: { temp: number };
  weather: { description: string }[];
}[];

const ContentAreaWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<{
    [key: string]: ForecastData;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week">(
    "today",
  );

  const { t } = useTranslation("common");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        if (selectedPeriod === "today") {
          const data = await fetchWeather();
          setWeatherData(data);
          setForecastData(null); // Clear forecast data
        } else if (selectedPeriod === "week") {
          const hurghadaForecast = await fetchForecast("Hurghada", "week");
          const sharmForecast = await fetchForecast("Sharm El-Sheikh", "week");
          setForecastData({
            hurghada: hurghadaForecast,
            sharm: sharmForecast,
          });
          setWeatherData(null); // Clear today's data
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedPeriod]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Button Group */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <ButtonGroup variant="contained">
          <Button
            onClick={() => setSelectedPeriod("today")}
            sx={{
              backgroundColor:
                selectedPeriod === "today"
                  ? "primary.main"
                  : "background.default",
              color:
                selectedPeriod === "today"
                  ? "primary.contrastText"
                  : "text.primary",
            }}
          >
            {t("today")}
          </Button>
          <Button
            onClick={() => setSelectedPeriod("week")}
            sx={{
              backgroundColor:
                selectedPeriod === "week"
                  ? "primary.main"
                  : "background.default",
              color:
                selectedPeriod === "week"
                  ? "primary.contrastText"
                  : "text.primary",
            }}
          >
            {t("this-week")}
          </Button>
        </ButtonGroup>
      </Box>

      {/* Content */}
      <Box sx={{ mt: 2 }}>
        {selectedPeriod === "today" && weatherData && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader title={t("hurghada")} />
                <CardContent>
                  <Typography variant="h6">
                    {weatherData.hurghada.main.temp}°C
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {weatherData.hurghada.weather[0].description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader title={t("sharm")} />
                <CardContent>
                  <Typography variant="h6">
                    {weatherData.sharm.main.temp}°C
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {weatherData.sharm.weather[0].description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {selectedPeriod === "week" && forecastData && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader title={t("hurghada")} />
                <CardContent>
                  {forecastData.hurghada.map((entry, index) => (
                    <Box key={index} mb={2}>
                      <Typography variant="body1">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }).format(new Date(entry.dt * 1000))}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {entry.main.temp}°C, {entry.weather[0].description}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader title={t("sharm")} />
                <CardContent>
                  {forecastData.sharm.map((entry, index) => (
                    <Box key={index} mb={2}>
                      <Typography variant="body1">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }).format(new Date(entry.dt * 1000))}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {entry.main.temp}°C, {entry.weather[0].description}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ContentAreaWeather;
