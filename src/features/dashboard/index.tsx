"use client";

import { useMemo, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User, AuctionCar } from "@/interfaces";
import Button from "@/components/common/Button";
import { useQuery } from "@tanstack/react-query";
import { auctionService } from "@/services/auction.service";
import GlassmorphismWrapper from "@/components/common/GlassmorphismWrapper";
import MilageIcon from "@/assets/svg/MilageIcon";
import ScheduleIcon from "@/assets/svg/ScheduleIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";

interface DashboardProps {
  user: User | null;
  activeTab: "all" | "won" | "lost" | "schedule";
  setActiveTab: (tab: "all" | "won" | "lost" | "schedule") => void;
}

// Constants
const GRADIENTS = {
  winner:
    "linear-gradient(221.12deg, #27C840 3%, rgba(255, 255, 255, 0.1) 27%, rgba(255, 255, 255, 0.05) 74%, #27C840 90.59%, #27C840 100%)",
  lost: "linear-gradient(221.12deg, rgba(0, 0, 0, 0.42) 3%, rgba(255, 255, 255, 0.1) 27%, rgba(255, 255, 255, 0.05) 74%, rgba(0, 0, 0, 0.42) 90.59%, rgba(0, 0, 0, 0.42) 100%)",
  default:
    "linear-gradient(221.12deg, rgba(220, 55, 41, 0.75) 3%, rgba(255, 255, 255, 0.1) 27%, rgba(255, 255, 255, 0.05) 74%, rgba(203, 61, 29, 0.55) 90.59%, rgba(220, 55, 41, 0.5) 100%)",
} as const;

const formatTimeRemaining = (endTime: string) => {
  if (!endTime) return "";
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const diff = end - now;

  if (diff <= 0) return "ENDED";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}D ${hours}H ${minutes}M`;
};

const STATUS_TAGS: Record<
  AuctionCar["status"],
  { label: string; color: string }
> = {
  active: { label: "Ending Soon", color: "bg-customRed text-white" },
  won: { label: "You Won", color: "bg-customGreen text-white" },
  lost: { label: "Lost", color: "bg-customRed text-white" },
  scheduled: { label: "Scheduled", color: "bg-customRed text-white" },
  ended: { label: "Auction End", color: "bg-customRed text-white" },
  outbid: { label: "Lost", color: "bg-customRed text-white" },
};

const LOST_STATUSES: AuctionCar["status"][] = ["lost", "ended", "outbid"];

// Utility functions
const formatCurrency = (amount: number) => amount.toLocaleString("en-IN");

const getStatusTag = (status: AuctionCar["status"]) =>
  STATUS_TAGS[status] || { label: "", color: "" };

const getBackgroundGradient = (
  status: AuctionCar["status"],
  badge?: string,
): string => {
  if (status === "won" || badge === "WINNER") return GRADIENTS.winner;
  if (LOST_STATUSES.includes(status) || badge === "LOST" || badge === "OUTBID")
    return GRADIENTS.lost;
  return GRADIENTS.default;
};

// Filter functions
const filterCarsByTab = (
  cars: AuctionCar[],
  tab: DashboardProps["activeTab"],
): AuctionCar[] => {
  switch (tab) {
    case "won":
      return cars.filter((car) => car.status === "won");
    case "lost":
      return cars.filter((car) => LOST_STATUSES.includes(car.status));
    case "schedule":
      return cars.filter((car) => car.status === "scheduled");
    case "all":
    default:
      return cars;
  }
};

// Sub-components
interface BidInfoProps {
  car: AuctionCar;
}

const BidInfo = memo(({ car }: BidInfoProps) => {
  const { status } = car;

  if (status === "active") {
    return (
      <div className="flex flex-col md:flex-row gap-4 font-display leading-loose">
        <div className="text-lg text-gray-700 dark:text-white">
          <span className="font-semibold">CURRENT BID: </span>
          <span>{formatCurrency(car.currentBid || 0)}</span>
        </div>
        <div className="text-lg text-gray-700 dark:text-white">
          <span className="font-semibold">START PRICE: </span>
          <span>{formatCurrency(car.startPrice || 0)}</span>
        </div>
      </div>
    );
  }

  if (status === "won") {
    return (
      <div className="text-sm text-gray-700 dark:text-white">
        <span className="font-semibold">WINNING BID: </span>
        <span>{formatCurrency(car.winningBid || 0)}</span>
      </div>
    );
  }

  if (status === "scheduled") {
    return (
      <div className="text-sm text-gray-700 dark:text-white">
        <span className="font-semibold">SCHEDULE BID: </span>
        <span>{formatCurrency(car.scheduleBid || 0)}</span>
      </div>
    );
  }

  if (status === "ended") {
    return (
      <>
        <div className="text-sm text-gray-700 dark:text-white">
          <span className="font-semibold">CURRENT BID: </span>
          <span>{formatCurrency(car.currentBid || 0)}</span>
        </div>
        <div className="text-sm text-gray-700 dark:text-white">
          <span className="font-semibold">START PRICE: </span>
          <span>{formatCurrency(car.startPrice || 0)}</span>
        </div>
      </>
    );
  }

  if (status === "outbid") {
    return (
      <>
        <div className="text-sm text-gray-700 dark:text-white">
          <span className="font-semibold">YOUR BID: </span>
          <span>{formatCurrency(car.yourBid || 0)}</span>
        </div>
        <div className="text-sm text-gray-700 dark:text-white">
          <span className="font-semibold">WINNING BID: </span>
          <span>{formatCurrency(car.winningBid || 0)}</span>
        </div>
      </>
    );
  }

  return null;
});

BidInfo.displayName = "BidInfo";

interface ActionButtonProps {
  status: AuctionCar["status"];
  onClick?: () => void;
}

const ActionButton = memo(({ status, onClick }: ActionButtonProps) => {
  const buttonConfig = {
    active: {
      text: "JOIN LIVE",
      className:
        "bg-customRed hover:bg-red-700 text-white font-semibold uppercase text-sm px-3 py-2",
    },
    won: {
      text: "VIEW DETAILS",
      className:
        "bg-customRed hover:bg-red-700 text-white font-semibold uppercase text-sm px-3 font-display py-2",
    },
    lost: {
      text: "VIEW DETAILS",
      className:
        "bg-customRed hover:bg-red-700 text-white font-semibold uppercase text-sm px-3 font-display py-2",
    },
    outbid: {
      text: "YOU WERE OUTBID",
      className:
        "bg-customRed hover:bg-red-700 text-white font-semibold uppercase text-sm px-6 py-2",
    },
  } as const;

  const config = buttonConfig[status as keyof typeof buttonConfig];
  if (!config) return null;

  return (
    <Button variant="primary" className={config.className} onClick={onClick}>
      {config.text}
    </Button>
  );
});

ActionButton.displayName = "ActionButton";

interface CarCardProps {
  car: AuctionCar;
}

const CarCard = memo(({ car }: CarCardProps) => {
  const router = useRouter();
  const statusTag = getStatusTag(car.status);
  const gradient = getBackgroundGradient(car.status, car.badge);

  const handleAction = () => {
    router.push(`/auctions/${car.id}`);
  };

  return (
    <GlassmorphismWrapper className="!p-3 bg-white dark:!bg-[#111111] !border-0 dark:!border">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Car Image */}
        <div className="flex-shrink-0">
          <div className="w-full md:w-[152.77px] h-[158.39px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <Image
              src={car.image || "/images/cars/ford-mustang.jpg"}
              alt={car.carName}
              width={256}
              height={192}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Car Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Car Name and Info */}
            <div className="flex flex-col-reverse md:flex-row items-start justify-between mb-4">
              <div className="!w-full">
                <div className="flex items-center gap-1 !w-full">
                  <div className="w-[3px] h-5 bg-customRed" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">
                    {car.carName}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-white mt-2">
                  <div className="flex items-center gap-2">
                    <ScheduleIcon />
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-display">
                      {car.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MilageIcon />
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-display">
                      {car.mileage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timer or Badge */}
              <div className="flex flex-col items-end gap-2 w-full">
                {(car.timer || car.badge) && (
                  <div
                    className="flex items-center justify-center md:w-[163px] w-full h-[47px]  opacity-100 pt-2 pr-6 pb-2 pl-6 mb-4 md:mb-0"
                    style={{ background: gradient }}
                  >
                    {car.timer && (
                      <span className="text-orange-500 uppercase font-display font-semibold text-2xl leading-none tracking-normal align-middle">
                        {car.timer}
                      </span>
                    )}
                    {car.badge && (
                      <span
                        className={`uppercase font-display font-semibold text-2xl leading-none tracking-normal align-middle ${
                          car.badge === "WINNER"
                            ? "text-[#27C840]"
                            : "text-[#A5A5A5]"
                        }`}
                      >
                        {car.badge}
                      </span>
                    )}
                  </div>
                )}
                {car.status === "scheduled" && (
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-gray-700 dark:text-white hover:text-customRed transition-colors"
                      aria-label="Edit scheduled auction"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="p-2 text-gray-700 dark:text-white hover:text-customRed transition-colors"
                      aria-label="Delete scheduled auction"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bid Information */}
            <div className="space-y-2 mb-4">
              <BidInfo car={car} />
            </div>

            {/* Status Tag and Bidder Count */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {statusTag.label && (
                  <span
                    className={`px-3 py-1 text-xs font-semibold ${statusTag.color}`}
                  >
                    {statusTag.label}
                  </span>
                )}
                {car.bidderCount && (
                  <span className="text-sm text-gray-600 dark:text-white">
                    {car.bidderCount} Bidders
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4">
                <ActionButton status={car.status} onClick={handleAction} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassmorphismWrapper>
  );
});

CarCard.displayName = "CarCard";

// Main component
export default function Dashboard({
  user,
  activeTab,
  setActiveTab,
}: DashboardProps) {
  const { data: auctionsData, isLoading } = useQuery({
    queryKey: ["my-bids"],
    queryFn: () => auctionService.getMyBids(),
  });

  const auctions = useMemo(() => {
    if (!auctionsData?.data?.results) return [];

    return auctionsData.data.results.map((auction: any): AuctionCar => {
      const vehicleEntry = auction.vehicles?.[0];
      const vehicle = vehicleEntry?.vehicleId;
      const vehicleData = typeof vehicle === "object" ? vehicle : null;

      const currentUserId = user?.id;
      const winnerId =
        auction.winnerId?._id || auction.winnerId?.id || auction.winnerId;
      const isWinner = winnerId === currentUserId;
      const isClosed =
        auction.status === "ended" ||
        auction.status === "closed" ||
        new Date(auction.endDate || auction.endTime) < new Date();

      let status: AuctionCar["status"] = "active";
      let badge: AuctionCar["badge"] = undefined;

      if (isWinner) {
        status = "won";
        badge = "WINNER";
      } else if (isClosed) {
        status = "lost";
        badge = "LOST";
      } else if (auction.status === "scheduled") {
        status = "scheduled";
      }

      return {
        id: auction.id || auction._id,
        carName: auction.title || vehicleData?.name || "AUCTION CAR",
        year: vehicleData?.year?.toString() || "—",
        mileage: vehicleData?.mileage
          ? `${vehicleData.mileage.toLocaleString()} KM`
          : "—",
        image: vehicleData?.images?.[0] || "/images/cars/ford-mustang.jpg",
        status,
        currentBid: auction.currentBid || vehicleEntry?.minimumBidAmount || 0,
        startPrice:
          auction.startingPrice || vehicleEntry?.minimumBidAmount || 0,
        winningBid: isWinner ? auction.currentBid : undefined,
        bidderCount: auction.participants?.length || 0,
        timer: !isClosed
          ? formatTimeRemaining(auction.endDate || auction.endTime)
          : undefined,
        badge,
      };
    });
  }, [auctionsData, user]);

  const filteredCars = useMemo(
    () => filterCarsByTab(auctions, activeTab),
    [auctions, activeTab],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customRed"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="space-y-6">
          {filteredCars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-700 dark:text-white">
                No auction cars found
              </p>
            </div>
          ) : (
            filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          )}
        </div>
      </div>
    </div>
  );
}
