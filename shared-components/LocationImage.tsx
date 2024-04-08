import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface WeatherLocation {
  name: string;
  country: string;
}

const LocationImage: React.FC<{ weather: { location: WeatherLocation } }> = ({
  weather,
}) => {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        // Make a request to the Unsplash API to get a random image based on the location
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              query: `${weather?.location?.name} ${weather?.location?.country}`,
              client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            },
          }
        );

        // Extract the image URL from the response
        const imageUrl = response.data.urls.regular;
        setBgImage(imageUrl);
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchBackgroundImage();
  }, [weather?.location?.name, weather?.location?.country]);

  return (
    <div
      className="relative h-[150px] max-lg:mt-5 text-center flex items-center justify-center text-white text-lg font-semibold rounded-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>

      <div className="relative z-10">
        {`${weather?.location?.name}, ${weather?.location?.country}`}
      </div>
    </div>
  );
};

export default LocationImage;
