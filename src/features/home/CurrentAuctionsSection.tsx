"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BlogCard from "../blog/BlogCard";
import Button from "@/components/common/Button";
import { useQuery } from "@tanstack/react-query";
import { auctionService } from "@/services/auction.service";


interface CurrentAuctionsSectionProps {
  className?: string;
  auctions?: Array<{
    id: string;
    carName: string;
    year: string;
    mileage: string;
    image: string;
    status: "active" | "soon" | "close";
    currentBid: number;
    timeRemaining?: string;
    isHot?: boolean;
  }>;
  titleClassName?: string;
  }

const CurrentAuctionsSection = ({
  className,
  auctions: initialAuctions = [],
  titleClassName,
}: CurrentAuctionsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { data: auctionsData, isLoading } = useQuery({
    queryKey: ['auctions'],
    queryFn: () => auctionService.getAuctions({ isActive: true, limit: 100 })
  });
  
  const fetchedAuctions = auctionsData?.data?.results || [];
  
  const formatTimeRemaining = (endDate: string) => {
    if (!endDate) return "—";
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return "Ended";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}D ${hours}H`;
  };

  const getStatus = (auction: any) => {
    const now = new Date();
    const start = new Date(auction.startDate || auction.startTime);
    const end = new Date(auction.endDate || auction.endTime);
    
    if (now > end) return "close";
    if (now < start) return "soon";
    return "active";
  };

  const mappedAuctions = fetchedAuctions.length > 0 ? fetchedAuctions.map((auction: any) => {
    const vehicle = auction.vehicles?.[0]?.vehicleId;
    const vehicleData = typeof vehicle === 'object' ? vehicle : {};
    
    return {
      id: auction.id || auction._id,
      carName: auction.title || vehicleData.name || "Auction Car",
      year: vehicleData.year?.toString() || auction.year || "—",
      mileage: vehicleData.mileage ? `${vehicleData.mileage} km` : (auction.mileage || "—"),
      image: vehicleData.images?.[0] || auction.images?.[0] || "",
      status: getStatus(auction),
      currentBid: auction.currentBid || vehicleData.price || 0,
      timeRemaining: formatTimeRemaining(auction.endDate || auction.endTime),
      isHot: auction.isHot || false,
      date: auction.startDate || new Date().toISOString() // for BlogCard date badge
    };
  }) : initialAuctions;

  // Show 3 auctions at a time
  const itemsPerPage = 3;
  const totalPages = Math.ceil(mappedAuctions.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleAuctions = mappedAuctions.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section className={` ${className ? className : ""}`}>
      <div className="2xl:container 2xl:mx-auto px-4 2xl:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between lg:mb-12 mb-6">
          <h2 className={`text-black dark:text-white font-display text-2xl md:text-4xl lg:text-5xl font-semibold ${titleClassName ? titleClassName : ""} uppercase tracking-wide`}>
            CURRENT AUCTIONS
          </h2>
          <div className="hidden md:flex items-center gap-4">
            {/* Join Live Auction Button */}
            <Button className="" variant="primary">
              JOIN LIVE AUCTION
            </Button>
            {/* Navigation Arrows - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 border border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
                aria-label="Previous auctions"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
                aria-label="Next auctions"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Auctions Grid - Horizontal scroll on mobile, grid on desktop */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 ">
          {/* Mobile: Horizontal scrollable container */}
          <div className="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
            {mappedAuctions.map((auction: any) => (
              <div key={auction.id} className="flex-shrink-0 w-[85vw] snap-start">
                <BlogCard post={auction} link={`/auctions/${auction.id}`} />
              </div>
            ))}
          </div>
          
          {/* Desktop: Grid with pagination */}
          <div className="hidden md:contents">
            {visibleAuctions.map((auction: any) => (
              <BlogCard key={auction.id} post={auction} link={`/auctions/${auction.id}`} />
            ))}
          </div>
          <div className="flex justify-center w-full px-4 md:hidden">

          <Button className="w-full" variant="primary">
              JOIN LIVE AUCTION
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentAuctionsSection;

