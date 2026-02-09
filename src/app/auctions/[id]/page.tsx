"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { auctionService, Auction } from "@/services/auction.service";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import {
  FiClock,
  FiMapPin,
  FiCalendar,
  FiArrowLeft,
  FiUsers,
} from "react-icons/fi";
import Link from "next/link";
import MilageIcon from "@/assets/svg/MilageIcon";

import { authService } from "@/services/auth.service";

export default function AuctionDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const queryClient = useQueryClient();
  const [bidAmount, setBidAmount] = useState<number>(0);

  const { data: auctionData, isLoading: isAuctionLoading } = useQuery({
    queryKey: ["auction", id],
    queryFn: () => auctionService.getAuctionById(id),
    enabled: !!id,
  });

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getCurrentUser(),
  });

  const { data: myBidsData } = useQuery({
    queryKey: ["my-bids"],
    queryFn: () => auctionService.getMyBids(),
  });

  const auction =
    auctionData?.data ||
    myBidsData?.data?.results?.find((a: any) => a.id === id || a._id === id);
  const vehicle = auction?.vehicles?.[0]?.vehicleId || {};

  const currentUserId = userData?.id;
  const isWinner =
    auction?.winnerId &&
    ((typeof auction.winnerId === "object" &&
      auction.winnerId._id === currentUserId) ||
      auction.winnerId === currentUserId);

  const { data: bidsData } = useQuery({
    queryKey: ["bids", id],
    queryFn: () =>
      auctionService.getBids(
        id,
        vehicle?._id || vehicle?.id || auction?.vehicles?.[0]?.vehicleId,
      ),
    enabled: !!id && !!vehicle,
  });

  useEffect(() => {
    if (auctionData) {
      console.log("Auction Data Response:", auctionData);
    }
  }, [auctionData]);

  useEffect(() => {
    if (bidsData) {
      console.log("Bids API Response:", bidsData);
    }
  }, [bidsData]);

  useEffect(() => {
    if (auction) {
      const currentPrice = auction.currentBid || auction.startingPrice || 0;
      const minBid = auction.vehicles?.[0]?.minimumBidAmount || 0;
      const increment = auction.vehicles?.[0]?.bidIncrement || 1000;

      const startingBid = Math.max(currentPrice + increment, minBid);
      setBidAmount(startingBid);
    }
  }, [auction]);

  const participateMutation = useMutation({
    mutationFn: () => auctionService.participateInAuction(id),
    onSuccess: () => {
      toast.success("Participation request submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["auction", id] });
      queryClient.invalidateQueries({ queryKey: ["my-bids"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit participation request",
      );
    },
  });

  const placeBidMutation = useMutation({
    mutationFn: () =>
      auctionService.placeBid(
        id,
        vehicle?._id || vehicle?.id || auction?.vehicles?.[0]?.vehicleId,
        bidAmount,
      ),
    onSuccess: () => {
      toast.success("Bid placed successfully!");
      queryClient.invalidateQueries({ queryKey: ["auction", id] });
      queryClient.invalidateQueries({ queryKey: ["my-bids"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to place bid");
    },
  });

  const handleBidChange = (increment: boolean) => {
    const step = auction?.vehicles?.[0]?.bidIncrement || 1000;
    setBidAmount((prev) =>
      increment ? prev + step : Math.max(0, prev - step),
    );
  };

  const currentPrice = auction?.currentBid || auction?.startingPrice || 0;
  const minBidAmount = auction?.vehicles?.[0]?.minimumBidAmount || 0;
  const bidIncrement = auction?.vehicles?.[0]?.bidIncrement || 1000;
  const nextValidBid = Math.max(currentPrice + bidIncrement, minBidAmount);

  if (isAuctionLoading && !auction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Auction not found
      </div>
    );
  }

  const status = isWinner ? "won" : auction.status || "active";
  const isEnded =
    status === "ended" ||
    status === "closed" ||
    status === "won" ||
    status === "lost";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white pb-20 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-customRed hover:opacity-80 font-display font-semibold uppercase"
        >
          <FiArrowLeft /> Back to Auctions
        </Link>

        {isWinner && (
          <div className="w-full bg-[#2DD4BF] text-white p-4 mb-6 rounded-lg font-display font-bold text-center text-xl uppercase tracking-wide shadow-lg">
            🎉 Congratulations! You Won This Auction! 🎉
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
              <img
                src={
                  vehicle.images?.[0] ||
                  auction.images?.[0] ||
                  "/placeholder.png"
                }
                alt={auction.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-4 py-2 text-white text-sm font-bold uppercase tracking-wide
                    ${
                      status === "active"
                        ? "bg-[#2DD4BF]"
                        : status === "soon"
                          ? "bg-[#F59E0B]"
                          : status === "won"
                            ? "bg-[#2DD4BF]"
                            : "bg-[#BAC0CA]"
                    }`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h1 className="text-2xl md:text-4xl font-display font-bold uppercase mb-2">
              {auction.title || vehicle.name || "Auction Car"}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 font-display">
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                <span>{vehicle.year || 2024}</span>
              </div>
              <div className="flex items-center gap-2">
                <MilageIcon />
                <span>
                  {vehicle.mileage ? `${vehicle.mileage} km` : "0 km"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4" />
                <span>{vehicle.location || "Lahore, Pakistan"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4" />
                <span>{auction.participants?.length || 0} Bidders</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-display text-gray-500 uppercase font-semibold">
                    Current Bid
                  </span>
                  <span className="text-sm font-display text-gray-500 uppercase font-semibold">
                    Time Remaining
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-3xl font-display font-bold text-customRed">
                    RS {currentPrice.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 text-lg font-display font-semibold">
                    <FiClock />
                    <span>
                      {new Date(
                        auction.endDate || new Date().toISOString(),
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {!isEnded && (
                <>
                  {auction.isParticipant ? (
                    <div className="space-y-4">
                      <label className="block text-sm font-display font-semibold uppercase text-gray-500">
                        Your Bid
                      </label>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleBidChange(false)}
                          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-customRed hover:text-customRed transition-colors text-xl font-bold"
                          disabled={bidAmount <= nextValidBid}
                        >
                          -
                        </button>

                        <div className="flex-1 bg-gray-100 dark:bg-[#222] h-12 rounded-lg flex items-center justify-center text-xl font-display font-bold">
                          RS {bidAmount.toLocaleString()}
                        </div>

                        <button
                          onClick={() => handleBidChange(true)}
                          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-customRed hover:text-customRed transition-colors text-xl font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex justify-between text-xs font-display text-gray-400 px-1">
                        <span>Min Bid: RS {nextValidBid.toLocaleString()}</span>
                        <span>
                          Increment: RS {bidIncrement.toLocaleString()}
                        </span>
                      </div>

                      <Button
                        variant="primary"
                        className="w-full py-4 text-lg mt-4"
                        onClick={() => placeBidMutation.mutate()}
                        isLoading={placeBidMutation.isPending}
                      >
                        SET BID
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Send request to admin in order to participate in the
                        auction
                      </p>
                      <Button
                        variant="primary"
                        className="w-full py-4 text-lg"
                        onClick={() => participateMutation.mutate()}
                        isLoading={participateMutation.isPending}
                      >
                        SEND REQUEST
                      </Button>
                    </div>
                  )}
                </>
              )}

              {isEnded && (
                <div className="w-full py-4 bg-gray-200 dark:bg-gray-800 text-center rounded-lg font-display font-bold text-gray-500 uppercase">
                  Auction Ended
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-display font-bold uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-customRed inline-block"></span>
            Bidding History
          </h2>

          <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-gray-800">
                    <th className="p-4 md:p-6 font-display font-bold uppercase text-gray-400 text-sm">
                      Rank
                    </th>
                    <th className="p-4 md:p-6 font-display font-bold uppercase text-gray-400 text-sm">
                      Bidder
                    </th>
                    <th className="p-4 md:p-6 font-display font-bold uppercase text-gray-400 text-sm text-right">
                      Bid Amount
                    </th>
                    <th className="p-4 md:p-6 font-display font-bold uppercase text-gray-400 text-sm text-right">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bidsData?.data?.results?.length > 0 ? (
                    bidsData.data.results.map((bid: any, index: number) => (
                      <tr
                        key={bid._id || bid.id}
                        className={`border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors ${
                          index === 0
                            ? "bg-customRed/5 dark:bg-customRed/10"
                            : ""
                        }`}
                      >
                        <td className="p-4 md:p-6">
                          <span
                            className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                              index === 0
                                ? "bg-customRed text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="p-4 md:p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400 overflow-hidden uppercase">
                              {bid.bidderId?.fullName?.[0] || "A"}
                            </div>
                            <span className="font-semibold">
                              {bid.bidderId?.fullName || "Anonymous"}
                              {bid.bidderId?.id === currentUserId && (
                                <span className="ml-2 text-xs text-customRed font-bold uppercase">
                                  (You)
                                </span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 md:p-6 text-right font-display font-bold text-lg">
                          RS {bid.bidAmount.toLocaleString()}
                        </td>
                        <td className="p-4 md:p-6 text-right text-gray-400 text-sm">
                          {new Date(bid.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : auction?.participants?.length > 0 ? (
                    auction.participants.map((p: any, index: number) => (
                      <tr
                        key={p._id || p.id || index}
                        className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 md:p-6 text-gray-400">#</td>
                        <td className="p-4 md:p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400 overflow-hidden uppercase">
                              {p.fullName?.[0] || p.name?.[0] || "P"}
                            </div>
                            <span className="font-semibold">
                              {p.fullName || p.name || "Participant"}
                              {(p._id === currentUserId ||
                                p.id === currentUserId) && (
                                <span className="ml-2 text-xs text-customRed font-bold uppercase">
                                  (You)
                                </span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 md:p-6 text-right font-display font-semibold text-gray-500 italic">
                          Joined
                        </td>
                        <td className="p-4 md:p-6 text-right text-gray-400 text-sm">
                          —
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-12 text-center text-gray-500 font-display italic"
                      >
                        No bids placed yet. Be the first to bid!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
