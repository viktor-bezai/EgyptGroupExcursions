import { useState } from "react";
import { fetchForecast } from "@/utils/openweatherApi";

type Forecast = Record<string, any[]>;
type UseWeatherReturn = {
  forecast: Forecast | null;
  loading: boolean;
  error: string | null;
  loadForecast: (location: string, period: "week") => Promise<void>;
};

const useWeather = (): UseWeatherReturn => {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadForecast = async (location: string, period: "week") => {
    try {
      setLoading(true);
      const data = await fetchForecast(location, period);
      setForecast((prev) => ({ ...prev, [location]: data }));
    } catch (err: any) {
      setError(err.message || "Failed to fetch forecast");
    } finally {
      setLoading(false);
    }
  };

  return { forecast, loading, error, loadForecast };
};

export default useWeather;
