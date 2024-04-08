import React from "react";

const WindStatus: React.FC<{
  theme: string;
  windSpeed: number;
  windDirection: string;
}> = ({ theme, windSpeed, windDirection }) => (
  <section
    className={`rounded-xl py-5 ${
      theme === "dark" ? "bg-[#27272a] text-white" : "bg-white"
    } h-full flex flex-col justify-between 2xl:h-[230px] 2xl:text-2xl px-6`}
  >
    <span className="text-[#a8a8a8]">Wind Status</span>
    <h1 className="text-6xl mt-5">
      {windSpeed}
      <span className="text-lg">km/h </span>
    </h1>
    <br />
    <section className="flex items-center gap-3">
      <img src="/static/compass-svgrepo-com.svg" className="h-7 w-7" alt="" />
      <span>{windDirection}</span>
    </section>
  </section>
);
export default WindStatus;
