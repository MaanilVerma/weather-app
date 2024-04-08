import React from "react";
import GaugeChart from "../GaugeChart";

const UVIndex: React.FC<{ theme: string; uv: number }> = ({ theme, uv }) => (
  <section
    className={`rounded-xl ${
      theme === "dark" ? "bg-[#27272a] text-white" : "bg-white"
    } pt-3 h-full 2xl:h-[230px]`}
  >
    <span className="text-[#a8a8a8] ml-5 ">Uv Index</span>
    <GaugeChart value={uv} />
  </section>
);

export default UVIndex;
