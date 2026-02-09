"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import GlassmorphismWrapper from "./GlassmorphismWrapper";
import CalendarIcon from "@/assets/svg/CalendarIcon";
import ScheduleIcon from "@/assets/svg/ScheduleIcon";
import MilageIcon from "@/assets/svg/MilageIcon";

export interface CarCardProps {
  id: string;
  title: string;
  image: string;
  currentBid: string;
  mileage: string;
  year: string;
  status: "Available" | "Item Sold" | "Coming Soon";
  timer?: string;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  title,
  image,
  currentBid,
  mileage,
  year,
  status,
  timer,
}) => {
  return (
    <GlassmorphismWrapper className="!p-4 dark:bg-[#111111] bg-white ">
    <Link href={`/cars/${id}`}>
      <div className="group relative  cursor-pointer">
        {/* Status Badge - Teal for Available */}
        {status === "Available" && (
          <div className="absolute top-0 left-0 z-20 px-6  py-2 bg-customTeal dark:text-white text-black  text-lg font-semibold  tracking-wide ">
            {status}
          </div>
        )}

        {/* Timer Badge - Red */}
        {timer && (
          <div className="absolute top-0 right-0 z-20 px-3 py-1 bg-customRed dark:text-white text-black  text-xs font-semibold ">
            {timer}
          </div>
        )}

        {/* Car Image */}
        <div className="relative w-full h-[250px] overflow-hidden bg-neutral-800">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-gray-500">
              <Icon name="alert" size={48} />
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="pt-[24px] ">
          {/* Title with vertical red line */}
          <div className="flex items-center gap-2 pb-[17px]">
            <div className="w-[2px] h-5 bg-customRed"></div>
            <h3 className="dark:text-white text-black  text-lg font-semibold uppercase font-display line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Current Bid and Details Row */}
          <div className="flex items-start justify-between gap-4">
            {/* Left: Current Bid */}
            <div className="space-y-5 flex-1">
              <p className="dark:text-[#A5A5A5] text-black text-base uppercase tracking-wide">
                CURRENT BID
              </p>
              <p className="dark:text-white text-black  text-lg font-semibold font-display">
                RS: {currentBid}
              </p>
            </div>

            {/* Right: Mileage and Year */}
            <div className="flex flex-col items-start justify-start space-y-5 gap-2">
              {/* Mileage */}
              <div className="flex items-center gap-2">
                <MilageIcon  />
                <span className="dark:text-[#A5A5A5] text-black  text-sm">{mileage}</span>
              </div>

              {/* Year */}
              <div className="flex items-center gap-2">
                <ScheduleIcon/>
                <span className="dark:text-[#A5A5A5] text-black text-sm">{year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </GlassmorphismWrapper>
  );
};

export default CarCard;

