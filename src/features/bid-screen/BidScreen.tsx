"use client";

import React, { useState, useEffect } from "react";
import Breadcrumbs from "./components/Breadcrumbs";
import CarImagesSection from "./components/CarImagesSection";
import CarDetailsSection from "./components/CarDetailsSection";
import CountdownTimer from "./components/CountdownTimer";
import PriceLocationSection from "./components/PriceLocationSection";
import RankSection from "./components/RankSection";
import YourBidSection from "./components/YourBidSection";
import SummarySection from "./components/SummarySection";
import RelatedCarsSection from "./components/RelatedCarsSection";
import Avatar from "./components/Avatar";
import {
  BID_SCREEN_BIDDERS,
  BID_SCREEN_CAR_IMAGES,
  BID_SCREEN_INSPECTION,
  BID_SCREEN_FEATURES,
  BID_SCREEN_BASIC_DETAILS,
  BID_SCREEN_SPECIFICATIONS,
  BID_SCREEN_OWNERSHIP_INFO,
  BID_SCREEN_CAR_INFO,
  BID_SCREEN_RELATED_CARS,
} from "@/constants/constants";
import WinnerBadge from "@/components/common/WinnerBadge";

interface BidScreenProps {
  carId?: string;
}

const BidScreen: React.FC<BidScreenProps> = ({ carId = "1" }) => {
  const [bidAmount, setBidAmount] = useState(BID_SCREEN_CAR_INFO.initialBidAmount);
  const [hours, setHours] = useState(BID_SCREEN_CAR_INFO.countdownHours);
  const [minutes, setMinutes] = useState(BID_SCREEN_CAR_INFO.countdownMinutes);
  const [seconds, setSeconds] = useState(BID_SCREEN_CAR_INFO.countdownSeconds);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        setMinutes((prev) => {
          if (prev > 0) return prev - 1;
          setHours((prev) => (prev > 0 ? prev - 1 : 0));
          return 59;
        });
        return 59;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  const handleBidChange = (delta: number) => {
    const numericValue = parseInt(bidAmount.replace(/,/g, "")) || 0;
    const newValue = Math.max(0, numericValue + delta);
    setBidAmount(newValue.toLocaleString("en-IN"));
  };

  const handleBidAmountChange = (value: string) => {
    setBidAmount(value);
  };

  const getOrdinalSuffix = (rank: number) => {
    if (rank === 1) return "st";
    if (rank === 2) return "nd";
    if (rank === 3) return "rd";
    return "th";
  };

  return (
    <div className="min-h-screen md:pt-32 pt-20">
      <div className="2xl:container mx-auto px-4 md:px-6 lg:px-10 py-8">
     

        {/* Main Content Grid */}
        <div className="flex flex-col-reverse md:flex-col lg:flex-row gap-8 mb-12">
          {/* Left Column - Car Images and Details */}
          <div className="w-full lg:w-[45%] space-y-4 xl:pr-10">
          <Breadcrumbs breadcrumbs={BID_SCREEN_CAR_INFO.breadcrumbs} />
            <CarImagesSection title={BID_SCREEN_CAR_INFO.title} images={BID_SCREEN_CAR_IMAGES} />

            {/* Car Details Section */}
            <CarDetailsSection
              inspection={BID_SCREEN_INSPECTION}
              basicDetails={BID_SCREEN_BASIC_DETAILS}
              specifications={BID_SCREEN_SPECIFICATIONS}
              ownershipInfo={BID_SCREEN_OWNERSHIP_INFO}
              features={BID_SCREEN_FEATURES}
            />


          </div>

          {/* Right Column - Bidding Section */}
          <div className="w-full lg:w-[55%] space-y-6 xl:pl-10">
            
            {/* Title and Countdown */}
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <CountdownTimer hours={hours} minutes={minutes} seconds={seconds} />
            </div>
            <WinnerBadge/>

            <PriceLocationSection
              isStartPrice={false}
              startPrice={BID_SCREEN_CAR_INFO.startPrice}
              finalPrice={BID_SCREEN_CAR_INFO.finalPrice}
              location={BID_SCREEN_CAR_INFO.location}
            />

            <RankSection
              isFinalRankings={false}
              bidders={BID_SCREEN_BIDDERS}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              rankNote={BID_SCREEN_CAR_INFO.rankNote}
              getOrdinalSuffix={getOrdinalSuffix}
              Avatar={Avatar}
              formatTime={formatTime}
            />

            <YourBidSection
              bidAmount={bidAmount}
              bidSuggestion={BID_SCREEN_CAR_INFO.bidSuggestion}
              onBidChange={handleBidChange}
              onBidAmountChange={handleBidAmountChange}
            />

            <SummarySection
              minimumBid={BID_SCREEN_CAR_INFO.minimumBid}
              totalBid={BID_SCREEN_CAR_INFO.totalBid}
            />
            
          </div>
        </div>

        <RelatedCarsSection cars={BID_SCREEN_RELATED_CARS} />
      </div>
    </div>
  );
};

export default BidScreen;
