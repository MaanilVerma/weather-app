"use client";

import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { getCurrentWeather } from "@/utils/getCurrentWeather";

// Define the type for the context value
interface UserInputContextType {
  handleUserInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  userInput: string;
  weather: any;
  data: any;
  extraDetails: any;
  setData: any;
  setExtraDetails: any;
  isLoading: boolean;
  weatherTypeToggle: "celcius" | "fareinheit";
  handleWeatherTypeToggle: () => void;
  getUserLocationWeather: () => void;
}

// Create the context
const UserInputContext = createContext<UserInputContextType | undefined>(
  undefined
);

// Custom hook to consume the context
export const useUserInputContext = () => {
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error(
      "useUserInputContext must be used within a UserInputProvider"
    );
  }
  return context;
};

// Component to provide the context
export const UserInputProvider = ({ children }: { children: any }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [weather, setWeather] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [extraDetails, setExtraDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherTypeToggle, setWeatherTypeToggle] = useState<
    "celcius" | "fareinheit"
  >("celcius");

  // Function to handle user input
  const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setUserInput(e.currentTarget.value);
    }
  };

  const handleWeatherTypeToggle = () => {
    setWeatherTypeToggle((prev) =>
      prev === "celcius" ? "fareinheit" : "celcius"
    );
  };

  const getUserLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setIsLoading(true);
            const response = await getCurrentWeather(`${latitude},${longitude}`);
            setWeather(response);
          } catch (error: any) {
            toast.error("Could not fetch weather data for your location. 🙇");
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          toast.error("Unable to retrieve your location. 🙇");
          console.error(error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser. 🙇");
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const response = await getCurrentWeather(userInput || "Mumbai");
        setWeather(response);
      } catch (error: any) {
        toast.error("No matching location found. 🙇");
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, [userInput]);

  // Define the context value
  const value: UserInputContextType = {
    handleUserInput,
    userInput,
    weather,
    data,
    setData,
    extraDetails,
    setExtraDetails,
    isLoading,
    weatherTypeToggle,
    handleWeatherTypeToggle,
    getUserLocationWeather
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
};
