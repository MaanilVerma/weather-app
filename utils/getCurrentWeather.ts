import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;

export const getCurrentWeather = async (place: string) => {
  try {
    let config = {
      method: "get",
      url: `${baseURL}?key=${apiKey}&q=${place}&days=7&aqi=yes&alerts=yes`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
