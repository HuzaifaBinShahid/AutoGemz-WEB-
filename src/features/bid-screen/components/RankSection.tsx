"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bidder } from "@/constants/constants";

interface RankSectionProps {
  bidders: Bidder[];
  hours: number;
  minutes: number;
  seconds: number;
  isFinalRankings: boolean;
  rankNote: string;
  getOrdinalSuffix: (rank: number) => string;
  Avatar: React.FC<{ name: string; size?: number; borderWidth?: number; isYou?: boolean }>;
  formatTime: (value: number) => string;
}

const RankSection: React.FC<RankSectionProps> = ({
  bidders,
  hours,
  minutes,
  seconds,
  isFinalRankings,
  rankNote,
  getOrdinalSuffix,
  Avatar,
  formatTime,
}) => {
  return (
    <div className="">
      {isFinalRankings && (
        <>
          <h2 className="md:text-[36px] text-xl leading-[47px] uppercase text-black dark:text-white font-display font-semibold tracking-[1.4px] pt-[30px] pb-[24px]">
            Final Rankings
          </h2>
        </>
      )}
      {/* Header Table */}
      <div className="flex  sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 
      border-gray-300 dark:border-gray-700">

        <div className="flex items-center gap-2">
          <div className="w-1 h-6 sm:h-10 bg-customRed"></div>
          <h2 className="text-lg sm:text-xl font-bold uppercase font-display text-black 
            dark:text-white">
            RANK
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1 h-6 sm:h-10 bg-customRed"></div>
          <h2 className="text-lg sm:text-xl font-bold uppercase font-display text-black 
            dark:text-white">
            BID
          </h2>
        </div>
        {/* Countdown Timer */}
        <div className="bg-gray-200 dark:bg-gray-700 px-3 sm:px-4 py-2 rounded border border-gray-300 
        dark:border-gray-600">
          <span className="text-sm sm:text-base md:text-lg font-bold font-display text-black 
          dark:text-white">
            {formatTime(hours)}H {formatTime(minutes)}M {formatTime(seconds)}S
          </span>
        </div>
      </div>

      {/* Bidders Table */}
      <div className="mb-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black overflow-hidden">
        <table className="w-full border-collapse">
          <tbody>
            {bidders.map((bidder, index) => (
              <tr
                key={bidder.rank}
                className={cn(
                  "border-b border-gray-300 dark:border-gray-700",
                  index === 0
                    ? "bg-[#DC3729BF]"
                    : "bg-gray-100 dark:bg-[#1A1A1A]",
                  index === bidders.length - 1 && "border-b-0"
                )}
              >
                {/* RANK Column */}
                <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 border-r border-gray-300 dark:border-gray-700 align-middle">
                  <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
                    <div className="flex-shrink-0">
                      <Avatar
                        name={bidder.name}
                        size={index === 0 ? 32 : 28}
                        borderWidth={index === 0 ? 2 : 1}
                        isYou={bidder.isYou}
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className={cn(
                          "font-bold font-display text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl truncate",
                          index === 0
                            ? "text-white"
                            : "text-black dark:text-white"
                        )}
                      >
                        {bidder.rank}
                        {getOrdinalSuffix(bidder.rank)} Place
                      </span>
                      <span
                        className={cn(
                          "font-display text-[10px] sm:text-xs md:text-sm truncate",
                          index === 0
                            ? "text-white/90"
                            : "text-black dark:text-gray-300"
                        )}
                      >
                        {bidder.name.replace(" (You)", "")}
                        {bidder.isYou && (
                          <span className="text-customRed ml-1 font-semibold">(You)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </td>

                {/* BID Column */}
                <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 border-r border-gray-300 dark:border-gray-700 align-middle text-center">
                  <span
                    className={cn(
                      "font-bold font-display text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap",
                      index === 0 ? "text-white" : "text-black dark:text-white"
                    )}
                  >
                    RS: {bidder.bid}
                  </span>
                </td>

                {/* TIME Column */}
                <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 align-middle text-center">
                  <span
                    className={cn(
                      "font-bold font-display text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg whitespace-nowrap",
                      index === 0 ? "text-white" : "text-black dark:text-white"
                    )}
                  >
                    {bidder.timeAgo}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 lg:my-10 md:my-6 my-4 leading-relaxed">
        {rankNote}
      </p>

    
      {/* Congratulations Message - Show if user is in 1st place */}
      {(() => {
        const userBidder = bidders.find(bidder => bidder.isYou && bidder.rank === 1);
        if (!userBidder) return null;
        
        // Extract numeric value from bid string and format as USD
        const bidAmount = userBidder.bid.replace(/[^0-9]/g, '');
        const formattedBid = bidAmount ? parseInt(bidAmount).toLocaleString('en-US') : userBidder.bid;
        
        return (
          <div 
            className="w-full max-w-[680px] lg:h-[172px] h-[82px]  mx-auto mt-4 flex flex-col items-center justify-center gap-2 px-4 font-display"
            style={{
              background: 'linear-gradient(180deg, #DC3729 0%, #78160E 100%)'
            }}
          >
            <h3 className="text-white font-display font-semibold md:text-[36px] text-base lg:leading-[47px] tracking-[1.4px] text-center uppercase align-middle">
              Congratulations! You Won
            </h3>
            <p className="text-[#FFFFFF99] font-display font-semibold md:text-[20px] text-xs lg:leading-[28px] text-center align-middle">
              Your bid of $12 secured the 1st place.
            </p>
          </div>

        );
      })()}
      
    </div>
  );
};

export default RankSection;

