"use client";

import React from "react";

const RatingLegend: React.FC = () => {
  const legendItems = [
    { color: "bg-green-500", label: "EXCELLENT" },
    { color: "bg-cyan-500", label: "BETTER" },
    { color: "bg-blue-500", label: "AVERAGE" },
    { color: "bg-red-500", label: "BELOW AVERAGE" },
  ];

  return (
    <div className="space-y-5">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`md:w-[31.4px] md:h-[31.4px] w-[20px] h-[20px] ${item.color}`}></div>
          <span className="md:text-[14px] text-lg xl:text-[24px]  font-semibold text-black  dark:text-gray-300 uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RatingLegend;

