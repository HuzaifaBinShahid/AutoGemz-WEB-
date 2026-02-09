"use client";

import React from "react";
import DashedLine from "@/assets/svg/DashedLine";
import InfoIcon from "@/assets/svg/InfoIcon";

interface SummarySectionProps {
  minimumBid: string;
  totalBid: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ minimumBid, totalBid }) => {
  return (
    <div className="w-full max-w-[680px]">
      <h2
        className="mb-4 text-black dark:text-white text-xl sm:text-2xl md:text-[26px] leading-[100%] font-display font-semibold"
      >
        Summary || Action Result
      </h2>
      <div className="space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center md:gap-8 gap-4 h-auto sm:h-[41px] text-lg sm:text-xl md:text-[24px] leading-[100%] font-mulish font-normal text-black dark:text-white">
          <span>Minimum entry bid:</span>
          <span>{minimumBid}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center md:gap-8 gap-4 h-auto sm:h-[41px] text-lg sm:text-xl md:text-[24px] leading-[100%] font-mulish font-normal text-black dark:text-white">
          <span>Winning bid:</span>
          <span>{minimumBid}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center md:gap-8 gap-4 h-auto sm:h-[41px] text-lg sm:text-xl md:text-[24px] leading-[100%] font-mulish font-normal text-black dark:text-white">
          <span>Number of bidders:</span>
          <span>{minimumBid}</span>
        </div>
        <div className="w-full my-[11px] flex items-center pt-6 pb-4">
          <DashedLine className="w-full " />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center md:gap-8 gap-4 text-lg sm:text-xl md:text-[24px] leading-[100%] font-mulish font-normal text-black dark:text-white">
          <span className="font-normal">Total:</span>
          <span className="font-normal">{totalBid}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center md:gap-8 gap-4 text-lg sm:text-xl md:text-[24px] leading-[100%] font-mulish font-normal text-black dark:text-white">
          <span className="font-normal">Time Closed:</span>
          <span className="font-normal">2:00 PM (GMT)</span>
        </div>
      </div>
      <div className="flex  gap-3 mt-[50px]">
        <button className="px-[34px] py-[17.5px] bg-customRed hover:bg-red-700 text-white font-semibold font-display uppercase text-sm  transition-colors">
          Pay Now
        </button>
        <button className="px-[39px] py-[17.5px] bg-white text-black hover:bg-customRed dark:bg-[#111111] dark:text-white hover:text-white font-semibold font-display uppercase text-sm  transition-colors">
          View Car Details
        </button>
      </div>
      <div className="max-w-[340px] my-[11px] flex items-center gap-2 text-base font-semibold py-2 px-3 bg-[#DC37294D] text-[#DC3729] mt-4">
        <InfoIcon size={18} className="flex-shrink-0" />
        <span>You can return this car within 7 days.</span>
      </div>
    </div>
  );
};

export default SummarySection;

