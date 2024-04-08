import React from "react";

const SunriseSunset: React.FC<{
  theme: string;
  sunrise: string;
  sunset: string;
}> = ({ theme, sunrise, sunset }) => (
  <section
    className={`rounded-xl py-5 ${
      theme === "dark" ? "bg-[#27272a] text-white" : "bg-white"
    } h-full 2xl:h-[230px] px-6`}
  >
    <span className="text-[#a8a8a8]">Sunrise & Sunset</span>
    <section className="flex items-center gap-3 my-5 2xl:text-2xl font-semibold">
      <img
        src="/static/arrow-up-circle-svgrepo-com(1).svg"
        alt=""
        className="h-10 w-10 2xl:h-14 2xl:w-14"
      />
      <h1>{sunrise}</h1>
    </section>
    <section className="flex items-center gap-3 2xl:text-2xl font-semibold">
      <img
        src="/static/arrow-down-circle-svgrepo-com(1).svg"
        alt=""
        className="h-10 w-10 2xl:h-14 2xl:w-14"
      />
      <h1>{sunset}</h1>
    </section>
  </section>
);

export default SunriseSunset;
