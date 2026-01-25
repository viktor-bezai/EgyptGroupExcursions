import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.error("API key is missing. Check .env.local configuration.");
  throw new Error("API key is missing");
}

export const fetchWeather = async () => {
  console.log("Fetching weather data...");

  try {
    const [hurghadaResponse, sharmResponse] = await Promise.all([
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: "Hurghada",
          units: "metric",
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        },
      }),
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: "Sharm El-Sheikh",
          units: "metric",
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        },
      }),
    ]);

    console.log("Hurghada Response:", hurghadaResponse.data);
    console.log("Sharm Response:", sharmResponse.data);

    return {
      hurghada: hurghadaResponse.data,
      sharm: sharmResponse.data,
    };
  } catch (error: any) {
    console.error("Error in fetchWeather:", error);
    throw error; // Let the error propagate to handle in getServerSideProps
  }
};

export const fetchForecast = async (location: string, period: "week") => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast`,
    {
      params: { q: location, units: "metric", appid: API_KEY },
    },
  );

  const today = new Date();
  const nextPeriod = new Date();
  if (period === "week") {
    nextPeriod.setDate(today.getDate() + 7);
  }

  return response.data.list.filter((entry: any) => {
    const entryDate = new Date(entry.dt * 1000);
    return entryDate >= today && entryDate <= nextPeriod;
  });
};
