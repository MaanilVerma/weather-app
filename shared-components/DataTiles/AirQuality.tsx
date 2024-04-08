import React from "react";

const getAirQualityClassification = (pm10Value: any) => {
  if (pm10Value <= 50) {
    return "Normal (Minimal Impact)";
  } else if (pm10Value > 50 && pm10Value <= 100) {
    return "Moderate (May cause discomfort for some people)";
  } else if (pm10Value > 100 && pm10Value <= 150) {
    return "Unhealthy for Sensitive Groups (Affects people with heart or lung problems)";
  } else if (pm10Value > 150 && pm10Value <= 200) {
    return "Unhealthy (Everyone may begin to experience health effects)";
  } else if (pm10Value > 200 && pm10Value <= 300) {
    return "Very Unhealthy (Health warnings of serious effects)";
  } else {
    return "Hazardous (Emergency conditions)";
  }
};

const AirQuality: React.FC<{ theme: string; airQuality: string }> = ({
  theme,
  airQuality,
}) => (
  <section
    className={` rounded-xl flex justify-between relative flex-col ${
      theme === "dark" ? "bg-[#27272a] text-white" : "bg-white"
    }   py-5 h-[200px]   2xl:h-[200px]  px-6`}
  >
    <span className="text-[#a8a8a8]">Air Quality</span>
    <h1 className="text-5xl">{airQuality}</h1>
    <span className="text-[#a8a8a8]">
      {getAirQualityClassification(airQuality)}
    </span>
    <section className="absolute  bottom-1/2 translate-y-2 -right-5">
      <div className="w-[120px] h-10 relative  -rotate-90 rounded-full border border-[#f3ecec]">
        <div className="w-7  circle h-7 absolute  bottom-1  right-5  bg-[#4050d2] rounded-full"></div>
      </div>
    </section>
  </section>
);

export default AirQuality;
