"use client";

import React from "react";
import Icon from "@/components/common/Icon";

interface PriceLocationSectionProps {
  startPrice: string;
  finalPrice: string;
  location: string;
  isStartPrice: boolean;
}

const PriceLocationSection: React.FC<PriceLocationSectionProps> = ({
  startPrice,
  finalPrice,
  location,
  isStartPrice,
}) => {
  return (
    <div className="flex flex-col gap-4 !my-6 md:!my-10 text-black dark:text-white">
      {isStartPrice && (
        <div>
          <span className="text-base sm:text-lg md:text-[24px] leading-tight md:leading-[32px] font-semibold uppercase tracking-wide font-display">
            START PRICE{" "}
          </span>
          <span className="text-base sm:text-lg md:text-[24px] leading-tight md:leading-[32px] font-semibold font-display">
            {startPrice}
          </span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div>
          <span className="text-base sm:text-lg md:text-[24px] leading-tight md:leading-[32px] font-semibold uppercase tracking-wide font-display">
            FINAL PRICE:{" "}
          </span>
          <span className="text-base sm:text-lg md:text-[24px] leading-tight md:leading-[32px] font-semibold font-display">
            {finalPrice}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="locationPin" size={18} className="text-customRed flex-shrink-0" />
          <span className="text-lg sm:text-xl md:text-[30px] leading-tight md:leading-[36px] font-semibold font-display">
            {location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceLocationSection;

