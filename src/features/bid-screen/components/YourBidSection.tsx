"use client";

import React from "react";
import Input from "@/components/common/Input";
import Icon from "@/components/common/Icon";
import ExclamationIcon from "@/assets/svg/ExclamationIcon";

interface YourBidSectionProps {
  bidAmount: string;
  bidSuggestion: string;
  onBidChange: (delta: number) => void;
  onBidAmountChange: (value: string) => void;
}

const YourBidSection: React.FC<YourBidSectionProps> = ({
  bidAmount,
  bidSuggestion,
  onBidChange,
  onBidAmountChange,
}) => {
  return (
    <div className=" ">
      <h2 className="text-xl font-bold uppercase font-display text-black dark:text-white mb-4">
        YOUR BID
      </h2>
      <div className="flex items-center gap-2 mb-4">
        <Icon name="lightbulb" size={20} className="text-customRed" />
        <span className="text-sm font-mulish font-medium leading-[21px] text-black dark:text-white">
          {bidSuggestion}
        </span>
      </div>

      {/* Bid Input with SET BID button on the right */}
      <div className="flex items-center gap-[8.1px] mb-4">
        <div className="max-w-[412px] flex items-center justify-center">
          <button
            onClick={() => onBidChange(-10000)}
            className="w-[56.73px] h-[56.73px] bg-customRed text-white flex items-center justify-center hover:bg-customRed/80 transition flex-shrink-0"
            aria-label="Decrease bid"
          >
            <Icon name="minus" size={20} />
          </button>
          <Input
            type="text"
            value={bidAmount}
            onChange={(e) => onBidAmountChange(e.target.value)}
            className="h-[56px] text-center text-lg font-bold font-display bg-white dark:bg-black text-black dark:text-white border-[#0000004D] dark:border-[#FFFFFF2E]"
          />
          <button
            onClick={() => onBidChange(10000)}
            className="w-[56.73px] h-[56.73px] bg-customRed text-white flex items-center justify-center hover:bg-customRed/80 transition flex-shrink-0"
            aria-label="Increase bid"
          >
            <Icon name="plus" size={20} />
          </button>
        </div>
        <button className="w-[108px] h-[56px] border-2 border-customRed text-customRed font-bold uppercase font-display whitespace-nowrap hover:bg-gray-50 transition">
          SET BID
        </button>
      </div>

      {/* Bid Options - Red buttons with yellow icons */}
      <div className="flex items-end gap-[27px] my-4">
        <div className="flex flex-col">
          <span className="text-xs uppercase font-semibold font-mulish text-black dark:text-white mb-1">
            INSTANT BID
          </span>
          <button className="w-[122px] h-[59px] flex items-center justify-center gap-1 bg-customRed text-white hover:bg-customRed/90 transition">
            <Icon name="lightning" size={20} className="text-[#FFD83B]" />
            <span className="text-sm font-bold font-display">10K+ BID</span>
          </button>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase font-semibold font-mulish text-black dark:text-white mb-1">
            SCHEDULE BID
          </span>
          <button className="w-[162px] h-[59px] flex items-center justify-center gap-1 bg-customRed text-white hover:bg-customRed/90 transition">
            <Icon name="clock" size={20} className="text-[#FFD83B]" />
            <span className="text-sm font-bold font-display">SCHEDULE BID</span>
          </button>
        </div>
      </div>

      {/* Bottom message with exclamation icon */}
      <div className="flex items-center gap-2 justify-center">
        <ExclamationIcon size={16} className="flex-shrink-0" />
        <p
          className="text-sm text-customRed uppercase leading-[21px] tracking-[1.4px] font-display font-semibold"
        >
          &quot;Set bid&quot; to confirm your offer.
        </p>
      </div>
    </div>
  );
};

export default YourBidSection;

