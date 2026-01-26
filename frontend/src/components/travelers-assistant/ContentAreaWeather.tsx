import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
} from "@mui/material";
import {
  WbSunny,
  Thermostat,
  Water,
  Air,
  CalendarToday,
  Today,
} from "@mui/icons-material";
import { fetchWeather, fetchForecast } from "@/utils/openweatherApi";
import { useTranslation } from "react-i18next";

type WeatherDataDescription = {
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
    weather: WeatherDataDescription[];
    wind?: { speed: number };
  };
  sharm: {
    main: {
      feels_like: number;
      humidity: number;
      temp: number;
    };
    weather: WeatherDataDescription[];
    wind?: { speed: number };
  };
};

type ForecastEntry = {
  dt: number;
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
};

type ForecastData = {
  [key: string]: ForecastEntry[];
};

const getWeatherIcon = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

const ContentAreaWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week">(
    "today",
  );

  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        if (selectedPeriod === "today") {
          const data = await fetchWeather();
          setWeatherData(data);
          setForecastData(null);
        } else if (selectedPeriod === "week") {
          const hurghadaForecast = await fetchForecast("Hurghada", "week");
          const sharmForecast = await fetchForecast("Sharm El-Sheikh", "week");
          setForecastData({
            hurghada: hurghadaForecast,
            sharm: sharmForecast,
          });
          setWeatherData(null);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch weather data";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedPeriod]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat(i18n.language, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat(i18n.language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  // Group forecast by day
  const groupForecastByDay = (forecast: ForecastEntry[]) => {
    const grouped: { [key: string]: ForecastEntry[] } = {};
    forecast.forEach((entry) => {
      const dateKey = formatDate(entry.dt);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(entry);
    });
    return grouped;
  };

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  const WeatherCardSkeleton = () => (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ bgcolor: "subtle.main", p: 2 }}>
        <Skeleton variant="text" width="60%" height={32} />
      </Box>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width={100} height={60} />
        </Box>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );

  const TodayWeatherCard = ({
    city,
    data,
  }: {
    city: string;
    data: WeatherData["hurghada"];
  }) => (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "subtle.main",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "subtle.dark",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          {city}
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Main temperature display */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            component="img"
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            sx={{ width: 100, height: 100 }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 300,
              color: "primary.main",
              ml: 1,
            }}
          >
            {Math.round(data.main.temp)}°
          </Typography>
        </Box>

        {/* Weather description */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            textTransform: "capitalize",
            color: "text.secondary",
            mb: 3,
          }}
        >
          {data.weather[0].description}
        </Typography>

        {/* Weather details */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 0.5,
              }}
            >
              <Thermostat
                sx={{ fontSize: 20, color: "warning.main", mr: 0.5 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t("feels-like") || "Feels like"}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {Math.round(data.main.feels_like)}°
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 0.5,
              }}
            >
              <Water sx={{ fontSize: 20, color: "info.main", mr: 0.5 }} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t("humidity") || "Humidity"}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {data.main.humidity}%
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 0.5,
              }}
            >
              <Air sx={{ fontSize: 20, color: "text.secondary", mr: 0.5 }} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t("wind") || "Wind"}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {data.wind?.speed ? `${Math.round(data.wind.speed)} m/s` : "—"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const ForecastCard = ({
    city,
    forecast,
  }: {
    city: string;
    forecast: ForecastEntry[];
  }) => {
    const groupedForecast = groupForecastByDay(forecast);

    return (
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "subtle.main",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "subtle.dark",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {city}
          </Typography>
        </Box>

        <CardContent sx={{ p: 0 }}>
          {Object.entries(groupedForecast).map(([date, entries], dayIndex) => (
            <Box key={date}>
              {/* Day header */}
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  bgcolor:
                    dayIndex % 2 === 0 ? "background.default" : "subtle.light",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "primary.main" }}
                >
                  {date}
                </Typography>
              </Box>

              {/* Time entries */}
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  px: 1,
                  py: 1,
                  gap: 1,
                  "&::-webkit-scrollbar": {
                    height: 4,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: "divider",
                    borderRadius: 2,
                  },
                }}
              >
                {entries.map((entry, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      minWidth: 70,
                      textAlign: "center",
                      p: 1,
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", display: "block" }}
                    >
                      {formatTime(entry.dt)}
                    </Typography>
                    <Box
                      component="img"
                      src={getWeatherIcon(entry.weather[0].icon)}
                      alt={entry.weather[0].description}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      {Math.round(entry.main.temp)}°
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", px: 2 }}>
      {/* Header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 3,
          color: "text.primary",
        }}
      >
        {t("weather") || "Weather"}
      </Typography>

      {/* Toggle Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <ToggleButtonGroup
          value={selectedPeriod}
          exclusive
          onChange={(_, value) => value && setSelectedPeriod(value)}
          sx={{
            bgcolor: "subtle.main",
            borderRadius: 2,
            p: 0.5,
            "& .MuiToggleButton-root": {
              border: "none",
              borderRadius: 1.5,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 500,
              color: "text.secondary",
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
              "&:hover": {
                bgcolor: "subtle.dark",
              },
            },
          }}
        >
          <ToggleButton value="today">
            <Today sx={{ mr: 1, fontSize: 20 }} />
            {t("today")}
          </ToggleButton>
          <ToggleButton value="week">
            <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
            {t("this-week")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {loading ? (
          <>
            <WeatherCardSkeleton />
            <WeatherCardSkeleton />
          </>
        ) : selectedPeriod === "today" && weatherData ? (
          <>
            <TodayWeatherCard
              city={t("hurghada")}
              data={weatherData.hurghada}
            />
            <TodayWeatherCard city={t("sharm")} data={weatherData.sharm} />
          </>
        ) : selectedPeriod === "week" && forecastData ? (
          <>
            <ForecastCard
              city={t("hurghada")}
              forecast={forecastData.hurghada}
            />
            <ForecastCard city={t("sharm")} forecast={forecastData.sharm} />
          </>
        ) : null}
      </Box>

      {/* Last updated */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          color: "text.disabled",
          mt: 3,
        }}
      >
        <WbSunny sx={{ fontSize: 14, mr: 0.5, verticalAlign: "middle" }} />
        {t("powered-by") || "Powered by"} OpenWeatherMap
      </Typography>
    </Box>
  );
};

export default ContentAreaWeather;
