"use client";

import React, { useMemo, memo, useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import type { User, AuctionCar, Vehicle } from "@/interfaces";
import GlassmorphismWrapper from "@/components/common/GlassmorphismWrapper";
import Pagination from "@/components/common/Pagination";
import MilageIcon from "@/assets/svg/MilageIcon";
import ScheduleIcon from "@/assets/svg/ScheduleIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { fetchSellingVehicles, deleteVehicle } from "@/store/thunks/vehicleSaleThunks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ConfirmationModal from "@/components/common/ConfirmationModal";

interface DashboardProps {
  user: User | null;
  activeTab: "all" | "unsold" | "sold";
  setActiveTab: (tab: "all" | "unsold" | "sold") => void;
}

const STATUS_TAGS: Record<any, { label: string; color: string }> = {
    request: { label: "Inspection Required", color: "bg-customRed text-white" },
    done: { label: "Inspection Done", color: "bg-customGreen text-white" },
};

// Utility functions
const formatCurrency = (amount: number) => amount.toLocaleString("en-IN");

const getStatusTag = (status: AuctionCar["status"]) => STATUS_TAGS[status] || { label: "", color: "" };

// Helper function to map backend vehicle to AuctionCar format
const mapVehicleToAuctionCar = (vehicle: any): Vehicle => {

  let status: AuctionCar["status"] = "active";
  
  // Check if vehicle is sold based on vehicleStatus or adStatus
  if (vehicle.vehicleStatus === "sold" || vehicle.adStatus === "sold") {
    status = "won";
  } else if (vehicle.vehicleStatus === "request" || vehicle.adStatus === "active") {
    status = "active";
  }

  // Get first image from images array, or use default
  const imageUrl = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images[0] 
    : "/images/MockImage.png";

  return {
    id: vehicle.id || vehicle._id || "",
    carName: `${vehicle.make || ""} ${vehicle.model || ""}`.trim() || "Unknown Vehicle",
    year: vehicle.year?.toString() || "",
    mileage: vehicle.mileage?.toString() || "0",
    image: imageUrl,
    status,
    startPrice: vehicle.price || 0,
    vehicleStatus: vehicle.vehicleStatus || "",
  };
};

// Filter functions
const filterCarsByTab = (cars: AuctionCar[], tab: DashboardProps["activeTab"]): AuctionCar[] => {
  switch (tab) {
    case "unsold":
      return cars.filter((car) => car.status === "active" || car.status === "scheduled");
    case "sold":
      return cars.filter((car) => car.status === "won");
    case "all":
    default:
      return cars;
  }
};

type BidInfoProps = {
  status: string;
  price?: number;
};

const BidInfo = memo(({ status, price }: BidInfoProps) => {

  if (status === "active") {
    return (
      <div className="flex flex-col md:flex-row gap-4 font-display leading-loose">
        <div className="text-lg text-gray-700 dark:text-white">
          <span className="font-semibold">HIGHEST BID: </span>
          <span>{formatCurrency(0)}</span>
        </div>
        <div className="text-lg text-gray-700 dark:text-white">
          <span className="font-semibold">YOUR PRICE: </span>
          <span>{price ? `Rs.${formatCurrency(price)}` : formatCurrency(0)}</span>
        </div>
      </div>
    );
  }


  return null;
});

BidInfo.displayName = "BidInfo";

interface CarCardProps {
  car: any;
  onDelete: (vehicleId: string) => void;
  isDeleting?: boolean;
}

const CarCard = memo(({ car, onDelete, isDeleting = false }: CarCardProps) => {
  const router = useRouter();
  const statusTag = getStatusTag(car.vehicleStatus);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = () => {
    // Navigate to sale-car page with vehicle ID and type
    router.push(`/sale-car?edit=${car.id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(car.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
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
            </div>
            {/* Timer or Badge */}
            <div className="flex flex-col items-end gap-2 w-full">
              <div className="flex gap-2">
                    <button
                      onClick={handleEditClick}
                      className="p-2 text-gray-700 dark:text-white hover:text-customRed transition-colors"
                      aria-label="Edit vehicle"
                    >
                      <EditIcon />
                    </button>
                    {/* <button
                      onClick={handleDeleteClick}
                      className="p-2 text-gray-700 dark:text-white hover:text-customRed transition-colors"
                      aria-label="Delete vehicle"
                    >
                      <DeleteIcon />
                    </button> */}
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
              isOpen={showDeleteModal}
              onClose={handleCancelDelete}
              onConfirm={handleConfirmDelete}
              title="Delete Vehicle"
              message={`Are you sure you want to delete "${car.carName}"? This action cannot be undone.`}
              confirmText="Delete"
              cancelText="Cancel"
              confirmVariant="danger"
              isLoading={isDeleting}
            />

            {/* Bid Information */}
            <div className="space-y-2 mb-4">
              <BidInfo status={"active"} price={car?.startPrice}/>
            </div>

            {/* Status Tag and Bidder Count */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-xs font-semibold ${statusTag.color}`}>
                    {statusTag.label}
                </span>
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
export default function MyVehicle({ user, activeTab, setActiveTab }: DashboardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { sellingVehicles, sellingVehiclesLoading, sellingVehiclesError, pagination } = useSelector(
    (state: RootState) => state.vehicleSale
  );

  // Fetch vehicles when component mounts or when page/activeTab changes
  useEffect(() => {
    dispatch(
      fetchSellingVehicles({
        page: currentPage,
        limit,
        sortBy: "createdAt:desc",
        status: activeTab,
      })
    );
  }, [dispatch, currentPage, activeTab]);

  // Map backend vehicles to AuctionCar format
  const mappedCars = useMemo(
    () => sellingVehicles.map(mapVehicleToAuctionCar),
    [sellingVehicles]
  );

  // Filter cars by active tab
  const filteredCars = useMemo(
    () => filterCarsByTab(mappedCars, activeTab),
    [mappedCars, activeTab]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const [deletingVehicleId, setDeletingVehicleId] = useState<string | null>(null);

  const handleDeleteVehicle = async (vehicleId: string) => {
    setDeletingVehicleId(vehicleId);
    try {
      const result = await dispatch(deleteVehicle(vehicleId));
      
      if (deleteVehicle.fulfilled.match(result)) {
        toast.success(result.payload.message || "Vehicle deleted successfully!");
        
        // Refresh the vehicle list
        dispatch(
          fetchSellingVehicles({
            page: currentPage,
            limit,
            sortBy: "createdAt:desc",
            status: activeTab,
          })
        );
      } else {
        const errorMessage = result.payload || "Failed to delete vehicle";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error deleting vehicle:", error);
      toast.error(error.message || "Failed to delete vehicle");
    } finally {
      setDeletingVehicleId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {sellingVehiclesLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-700 dark:text-white">Loading vehicles...</p>
          </div>
        ) : sellingVehiclesError ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{sellingVehiclesError}</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {filteredCars.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-700 dark:text-white">No vehicles found</p>
                </div>
              ) : (
                filteredCars.map((car) => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    onDelete={handleDeleteVehicle}
                    isDeleting={deletingVehicleId === car.id}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  maxVisiblePages={5}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
