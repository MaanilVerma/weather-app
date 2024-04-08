import React from "react";

const getHumidityClassification = (humidity: any) => {
  if (humidity <= 50) {
    return "Low 😔";
  } else if (humidity > 50 && humidity <= 70) {
    return "Normal 🙂";
  } else {
    return "High 😃";
  }
};

const Humidity: React.FC<{ theme: string; humidity: number }> = ({
  theme,
  humidity,
}) => (
  <section
    className={` rounded-xl  flex flex-col justify-between relative w-full  ${
      theme === "dark" ? "bg-[#27272a] text-white" : "bg-white"
    }    py-5 2xl:h-[200px] h-[200px]  px-6`}
  >
    <span className="text-[#a8a8a8]">Humidity</span>
    <h1 className="text-5xl">
      {humidity}
      <span className="text-3xl">% </span>
    </h1>
    <h1 className="text-[#a8a8a8]">{getHumidityClassification(humidity)}</h1>
    <section className="absolute  bottom-1/2 translate-y-5 -right-5">
      <div className="w-[150px] h-10 relative  -rotate-90 rounded-full border border-[#f3ecec]">
        <div className="w-7  circle h-7 absolute  bottom-1  left-2  bg-[#4050d2] rounded-full"></div>
      </div>
    </section>
  </section>
);

export default Humidity;
