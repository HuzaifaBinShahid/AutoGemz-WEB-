import React from "react";
import { INSPECTION_REPORT_DATA } from "@/constants/constants";

const InspectionSummarySection = () => {
  return (
    <div className="p-6 bg-white dark:bg-[#111111]">
      <div className="flex items-center gap-2">
        <div className="w-[3px] h-[57px] bg-[#DC3729]"></div>
        <h2 className="md:text-[36px] text-xl leading-[47px] uppercase text-black dark:text-white font-display font-semibold md:tracking-[1.4px]">
          CAR INSPECTION
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 md:gap-x-32 md:gap-y-8">
        {INSPECTION_REPORT_DATA.categories.map((category: any) => (
          <div key={category.name}>
            <div className="flex justify-between items-center mb-[18px]">
              <span className="text-sm leading-[21px] uppercase text-black dark:text-white font-display font-semibold tracking-[1.4px]">
                {category.name}
              </span>
              <span className="text-lg leading-[21.6px] uppercase text-black dark:text-white font-display font-light tracking-normal">
                {category.percentage}%
              </span>
            </div>
            <div className="w-full mb-[30px] h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-customRed rounded-full transition-all"
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspectionSummarySection;

