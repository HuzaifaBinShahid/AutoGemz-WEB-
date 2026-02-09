import React from "react";
import { INSPECTION_REPORT_DATA } from "@/constants/constants";

const DisclaimerSection = () => {
  return (
   
     <div className=" ">
     <h3 className="text-[26px] font-bold text-gray-900 dark:text-white  font-display mb-4">
     Disclaimer
     </h3>
     <p className="lg:text-2xl md:text-base  text-xs text-gray-700 dark:text-gray-300 leading-relaxed">

     {INSPECTION_REPORT_DATA.disclaimer}
     </p>
   </div>
  );
};

export default DisclaimerSection;

