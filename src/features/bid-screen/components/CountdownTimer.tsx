"use client";

import React from "react";

interface CountdownTimerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ hours, minutes, seconds }) => {
  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="bg-customRed text-white w-full max-w-[439px] h-auto min-h-[114px] py-[10px] px-4 sm:px-8 md:px-[32px] bid-countdown-border">
      <div className="text-center font-display uppercase text-base sm:text-lg md:text-[20px] leading-tight md:leading-[28px] font-semibold mb-2 md:mb-[6px]">
        BID CLOSE IN
      </div>
      <div className="flex justify-between gap-2 sm:gap-[6px]">
        {[
          { value: hours, label: "HOURS" },
          { value: minutes, label: "MINUTES" },
          { value: seconds, label: "SECONDS" },
        ].map((item, index) => (
          <React.Fragment key={item.label}>
            <div className="flex flex-col items-center flex-1">
              <div className="font-display text-center text-xl sm:text-2xl md:text-[30px] leading-tight md:leading-[36px] font-semibold">
                {formatTime(item.value)}
              </div>
              <div className="font-mulish text-center uppercase text-xs sm:text-sm md:text-[16px] leading-tight md:leading-[24px] font-semibold">
                {item.label}
              </div>
            </div>
            {index < 2 && <div className="h-8 sm:h-10 md:h-12 w-px bg-[#FFFFFF2E]"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;

