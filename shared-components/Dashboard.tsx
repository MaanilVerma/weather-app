import { useToggle } from "@/context/ToggleThemeContext";
import { useUserInputContext } from "@/context/UserInputContext";
import React, { useEffect } from "react";
import AirQuality from "./DataTiles/AirQuality";
import Humidity from "./DataTiles/Humidity";
import SunriseSunset from "./DataTiles/SunriseSunset";
import UVIndex from "./DataTiles/UVIndex";
import Visibility from "./DataTiles/Visibility";
import WindStatus from "./DataTiles/WindStatus";
import GaugeChart from "./GaugeChart";
import Skeleton from "./Skeleton";

const Dashboard = () => {
  const {
    weather,
    data,
    setData,
    extraDetails,
    setExtraDetails,
    weatherTypeToggle,
    isLoading,
    handleWeatherTypeToggle,
  } = useUserInputContext();
  const { theme, toggleTheme } = useToggle();
  useEffect(() => {
    if (Array.isArray(weather.forecast?.forecastday)) {
      setData((_: any) => {
        const newData = weather?.forecast?.forecastday?.map((day: any) => {
          const dayName = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "long",
          });
          return {
            dayName: dayName.substring(0, 3),
            avgtemp_c: day?.day?.avgtemp_c,
            icon: day?.day?.condition.icon,
            avgtemp_f: day?.day?.avgtemp_f,
          };
        });
        return [...newData];
      });
      setExtraDetails({
        uv: weather.forecast.forecastday[0]?.day?.uv,
        sunrise: weather.forecast.forecastday[0]?.astro.sunrise,
        sunset: weather.forecast.forecastday[0]?.astro.sunset,
        air_quality: weather.current?.air_quality?.pm10,
        avgtemp_c: weather.forecast?.forecastday[0]?.day?.avgtemp_c,
        avgtemp_f: weather.forecast?.forecastday[0]?.day?.avgtemp_f,
        avgvis_km: weather.forecast?.forecastday[0]?.day?.avgvis_km,
      });
    }
  }, [weather]);

  return (
    <>
      <section
        className={`w-full rounded-r-[2.5rem]  ${
          theme === "dark" ? "bg-[#343434] text-white" : "bg-[#f6f6f8]"
        }  h-auto  2xl:h-[800px]  max-xl:rounded-2xl  lg:pb-5 px-10 max-xl:p-5 `}
      >
        <section className="flex pt-5 pr-3 h-7">
          <section className="ml-auto flex items-center mt-5 gap-3 ">
            <section>
              {theme === "light" ? (
                <img
                  src="/static/icon-moon.svg"
                  className="cursor-pointer h-7"
                  alt="moon-icon"
                  onClick={toggleTheme}
                />
              ) : (
                <img
                  src="/static/icon-sun.svg"
                  className="cursor-pointer"
                  alt="sun-icon"
                  onClick={toggleTheme}
                />
              )}
            </section>
            <section
              onClick={handleWeatherTypeToggle}
              className={`w-10 h-10  cursor-pointer hover:bg-[#28231d] hover:text-white ${
                weatherTypeToggle === "celcius"
                  ? "bg-[#28231d] text-white"
                  : "bg-white text-black"
              }   rounded-full flex items-center justify-center text-lg `}
            >
              &#x2103;
            </section>
            <section
              onClick={handleWeatherTypeToggle}
              className={`w-10 h-10  cursor-pointer hover:bg-[#28231d] hover:text-white ${
                weatherTypeToggle === "fareinheit"
                  ? "bg-[#28231d] text-white"
                  : "bg-white text-black"
              }   rounded-full flex items-center justify-center text-lg `}
            >
              &#8457;
            </section>
          </section>
        </section>

        <section className="grid lg:grid-cols-7 gap-5  mt-14 xl:grid-cols-7 max-sm:grid-cols-2  md:grid-cols-4">
          {data.map((item: any, index: any) => {
            return (
              <section
                key={index}
                className={`rounded-xl   ${
                  theme === "dark" ? "bg-[#27272a] text-white" : "bg-white"
                }  py-2 text-center flex flex-col items-center justify-center select-none`}
              >
                <h1>{item.dayName}</h1>
                <img src={item.icon} alt="" />
                <h1>
                  {weatherTypeToggle === "celcius"
                    ? `${item.avgtemp_c} \u2103`
                    : `${item.avgtemp_f} \u2109`}
                </h1>
              </section>
            );
          })}
        </section>

        {/* Highlights Section*/}
        <section className="mt-10 select-none  ">
          <h1 className="text-xl "> Today's Highlights</h1>
          <section className="grid 2xl:grid-cols-3 gap-5 mt-5 lg:grid-cols-3 md:grid-cols-2  2xl:h-full ">
            {isLoading ? (
              <Skeleton />
            ) : (
              <UVIndex uv={extraDetails?.uv} theme={theme} />
            )}

            {isLoading ? (
              <Skeleton />
            ) : (
              <WindStatus
                theme={theme}
                windSpeed={weather?.current?.wind_kph}
                windDirection={weather?.current?.wind_dir}
              />
            )}

            {isLoading ? (
              <Skeleton />
            ) : (
              <SunriseSunset
                theme={theme}
                sunrise={extraDetails?.sunrise}
                sunset={extraDetails?.sunset}
              />
            )}

            {isLoading ? (
              <Skeleton />
            ) : (
              <Humidity theme={theme} humidity={weather?.current?.humidity} />
            )}

            {isLoading ? (
              <Skeleton />
            ) : (
              <Visibility theme={theme} visibility={extraDetails?.avgvis_km} />
            )}

            {isLoading ? (
              <Skeleton />
            ) : (
              <AirQuality
                theme={theme}
                airQuality={extraDetails?.air_quality}
              />
            )}
          </section>
        </section>
      </section>
    </>
  );
};

export default Dashboard;
