"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { auctionService } from "@/services/auction.service";
import BlogCard from "@/features/blog/BlogCard";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { authService } from "@/services/auth.service";

export default function MyAuctionsPage() {
  const { data: myBidsData, isLoading } = useQuery({
    queryKey: ['my-bids'],
    queryFn: () => auctionService.getMyBids()
  });

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser()
  });

  const fetchedAuctions = myBidsData?.data?.results || [];

  const formatTimeRemaining = (endDate: string) => {
    if (!endDate) return "—";
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return "Ended";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}D ${hours}H`;
  };

  const getStatus = (auction: any) => {
    const now = new Date();
    const start = new Date(auction.startDate || auction.startTime);
    const end = new Date(auction.endDate || auction.endTime);
    
    // Check for winner first
    if (auction.winnerId) {
      const winnerId = typeof auction.winnerId === 'object' ? auction.winnerId._id : auction.winnerId;
      if (winnerId === userData?.id) {
          return "won"; // Or something BlogCard can handle? BlogCard handles "active", "soon", "close". We might need to add "won"/"lost" support or map it to a badge.
      }
    }

    if (now > end) return "close";
    if (now < start) return "soon";
    return "active";
  };

  // Enhanced mapping including status calculation
  const mappedAuctions = fetchedAuctions.map((auction: any) => {
    const vehicle = auction.vehicles?.[0]?.vehicleId;
    const vehicleData = typeof vehicle === 'object' ? vehicle : {};
    
    const computedStatus = getStatus(auction);

    return {
      id: auction.id || auction._id,
      carName: auction.title || vehicleData.name || "Auction Car",
      year: vehicleData.year?.toString() || auction.year || "—",
      mileage: vehicleData.mileage ? `${vehicleData.mileage} km` : (auction.mileage || "—"),
      image: vehicleData.images?.[0] || auction.images?.[0] || "",
      status: computedStatus, 
      currentBid: auction.currentBid || vehicleData.price || 0,
      timeRemaining: formatTimeRemaining(auction.endDate || auction.endTime),
      isHot: auction.isHot || false,
      date: auction.startDate || new Date().toISOString()
    };
  });

  if (isLoading) {
      return <div className="min-h-screen pt-24 px-4 flex justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-customRed hover:opacity-80 font-display font-semibold uppercase">
          <FiArrowLeft /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-display font-bold uppercase mb-8">My Bids & Cars</h1>

        {mappedAuctions.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-display">
                No auctions found. Start bidding!
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mappedAuctions.map((auction: any) => (
                <div key={auction.id}> 
                   {/* BlogCard doesn't natively support "WON" status styling completely yet, but it renders the text. I'll rely on that for now or improve BlogCard later if needed */}
                   <BlogCard post={auction} link={`/auctions/${auction.id}`} />
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}
