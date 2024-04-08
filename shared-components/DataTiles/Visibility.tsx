import React from "react";

const getVisibilityClassification = (visibility: any) => {
  if (visibility <= 1) {
    return "Low 😔";
  } else if (visibility > 5 && visibility <= 10) {
    return "Normal 🙂";
  } else {
    return "High 😃";
  }
};

const Visibility: React.FC<{ theme: string; visibility: number }> = ({
  theme,
  visibility,
}) => (
  <section
    className={` rounded-xl flex justify-between flex-col  ${
      theme === "dark" ? "bg-[#27272a] text-white" : "bg-white"
    }   py-5 h-[200px]  2xl:h-[200px]  px-6`}
  >
    <span className="text-[#a8a8a8]">Visibility</span>
    <h1 className="text-5xl">
      {visibility}
      <span className="text-2xl"> km </span>
    </h1>
    <span className="text-[#a8a8a8]">
      {getVisibilityClassification(visibility)}
    </span>
  </section>
);

export default Visibility;
