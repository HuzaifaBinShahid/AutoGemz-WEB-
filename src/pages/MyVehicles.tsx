import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import DataTable from "../components/common/DataTable";
import Filter from "../components/svgs/auctions/Filter";
import { vehicleService } from "../services/vehicleService";
import { auctionService } from "../services/auctionService";
import StatusModal from "../components/common/StatusModal";
import StartAuctionModal from "../components/common/StartAuctionModal";

interface VehicleRow {
  id: string;
  display: {
    image: string;
    name: string;
  };
  vin: string;
  mileage: string;
  price: string;
  status: "ACTIVE" | "INACTIVE";
  isActive: boolean;
  vehicleStatus: string;
  auctionStarted: boolean;
  createdAt: string;
}

const MyVehicles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [statusModalConfig, setStatusModalConfig] = useState<{
    isOpen: boolean;
    vehicleId: string | null;
    vehicleName: string;
    action: "DELETE" | "RESTORE";
  }>({
    isOpen: false,
    vehicleId: null,
    vehicleName: "",
    action: "DELETE",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['vehicles', 1, 10],
    queryFn: () => vehicleService.getSellingVehicles({ page: 1, limit: 10 }),
  });

  const [startAuctionModal, setStartAuctionModal] = useState<{
    isOpen: boolean;
    vehicleId: string | null;
  }>({
    isOpen: false,
    vehicleId: null,
  });

  const createAuctionMutation = useMutation({
    mutationFn: (payload: any) => auctionService.createAuction(payload),
    onSuccess: () => {
      toast.success("Auction created successfully");
      setStartAuctionModal({ isOpen: false, vehicleId: null });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create auction");
      setStartAuctionModal({ isOpen: false, vehicleId: null });
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.response?.data?.message || "Error loading vehicles");
    }
  }, [isError, error]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => vehicleService.deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success("Vehicle deactivated successfully");
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to deactivate vehicle");
    },
  });

  const restoreMutation = useMutation({
    mutationFn: (id: string) => vehicleService.restoreVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success("Vehicle restored successfully");
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to restore vehicle");
    },
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, row: VehicleRow) => {
    e.stopPropagation();
    const newValue = e.target.value === "active";
    if (newValue === row.isActive) return;

    setStatusModalConfig({
      isOpen: true,
      vehicleId: row.id,
      vehicleName: row.display.name,
      action: newValue ? "RESTORE" : "DELETE",
    });
  };

  const handleCloseModal = () => {
    setStatusModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirmStatusChange = () => {
    if (!statusModalConfig.vehicleId) return;

    if (statusModalConfig.action === "DELETE") {
      deleteMutation.mutate(statusModalConfig.vehicleId);
    } else {
      restoreMutation.mutate(statusModalConfig.vehicleId);
    }
  };

  const formatVehicleData = (vehicles: any[]): VehicleRow[] => {
    return vehicles.map((v) => ({
      id: v.id || v._id,
      display: {
        image: v.images?.[0] || "https://placehold.co/600x400?text=No+Image",
        name: `${v.make || "Unknown"} ${v.model || "Vehicle"} ${v.year || ""}`,
      },
      vin: v.vin || "N/A",
      mileage: v.mileage ? `${v.mileage.toLocaleString()} km` : "0 km",
      price: v.price ? `AED ${v.price.toLocaleString()}` : "Price N/A",
      status: v.isActive ? "ACTIVE" : "INACTIVE",
      isActive: v.isActive !== false,
      vehicleStatus: v.vehicleStatus || "PENDING",
      auctionStarted: v.auctionStarted || false,
      createdAt: v.createdAt ? new Date(v.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : "N/A",
    }));
  };

  const statusColors: Record<string, string> = {
    PENDING: "#F59E0B",
    PASSED: "#3EB549",
    FAILED: "#DC3729",
    COMPLETED: "#3EB549",
    APPROVED: "#3EB549",
    ACTIVE: "#3EB549",
    "IN PROGRESS": "#3B82F6",
    REQUEST: "#F59E0B",
    INSPECTED: "#3EB549",
  };

  const vehicles: VehicleRow[] = data?.results ? formatVehicleData(data.results) : [];

  const columns = [
    {
      key: "display",
      label: "VEHICLE",
      render: (value: VehicleRow["display"]) => (
        <div className="flex items-center gap-3">
          <img
            src={value.image}
            alt={value.name}
            className="w-16 h-12 object-cover rounded"
          />
          <p className="font-medium text-gray-900">{value.name}</p>
        </div>
      ),
    },
    {
      key: "vin",
      label: "VIN",
    },
    {
      key: "mileage",
      label: "MILEAGE",
    },
    {
      key: "price",
      label: "PRICE",
    },
    {
      key: "isActive",
      label: "STATUS",
      render: (_: boolean, row: VehicleRow) => (
        <div className="flex flex-col gap-2">
          <span
            className="inline-block px-2 py-1 text-[10px] font-bold text-white uppercase text-center"
            style={{ backgroundColor: statusColors[row.vehicleStatus.toUpperCase()] || "#9CA3AF" }}
          >
            {row.vehicleStatus}
          </span>
          <select
            value={row.isActive ? "active" : "inactive"}
            onChange={(e) => handleStatusChange(e, row)}
            onClick={(e) => e.stopPropagation()}
            className={`px-2 py-1 rounded border text-sm font-medium focus:outline-none focus:ring-1 focus:ring-autogemz-orange transition-colors ${
              row.isActive 
                ? "text-[#3EB549] border-[#3EB5491A] bg-[#3EB5490D]" 
                : "text-[#DC3729] border-[#DC37291A] bg-[#DC37290D]"
            }`}
          >
            <option value="active" className="text-[#3EB549] bg-white">Active</option>
            <option value="inactive" className="text-[#DC3729] bg-white">Inactive</option>
          </select>
        </div>
      ),
    },
    {
      key: "vehicleStatus",
      label: "START AUCTION",
      render: (_: string, row: VehicleRow) => {
        if (row.auctionStarted) {
          return (
            <span className="px-3 py-1.5 text-[11px] font-bold text-[#DC3729] uppercase border border-[#DC37291A] bg-[#DC37290D]">
              Auction in progress
            </span>
          );
        }
        
        return row.vehicleStatus?.toUpperCase() === "INSPECTED" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setStartAuctionModal({
                isOpen: true,
                vehicleId: row.id,
              });
            }}
            className="px-3 py-1.5 text-[11px] font-bold text-white uppercase bg-autogemz-orange hover:bg-opacity-90 transition-colors"
          >
            Start Auction
          </button>
        ) : <span className="text-gray-400 text-xs">—</span>;
      },
    },
    {
      key: "createdAt",
      label: "CREATED AT",
    },
  ];

  return (
    <div className="p-6 bg-[#F2F2F2] min-h-screen">
      <div
        className="bg-white p-6"
        style={{
          boxShadow:
            "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            My Vehicles
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-[#1F293733] rounded-lg focus:outline-none focus:ring-2 focus:ring-autogemz-orange text-gray-700 placeholder:text-gray-500"
            />
            <button className="px-4 py-2 border border-[#1F2937] rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter />
              <span className="text-gray-700">Filter</span>
            </button>
          </div>
        </div>

        <div className="mb-4 border-b border-[#1F29371A]" />

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-100 animate-pulse">
                <div className="w-16 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">❌ Error loading vehicles. Please try again.</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20 bg-white">
            <p className="text-6xl mb-4 grayscale opacity-20">🚗</p>
            <p className="text-gray-400 text-xl font-medium">No vehicles found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={vehicles}
            onRowClick={(row) => navigate(`/my-vehicles/${row.id}`)}
          />
        )}
      </div>

      <StatusModal
        isOpen={statusModalConfig.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmStatusChange}
        title={statusModalConfig.action === "DELETE" ? "DEACTIVATE VEHICLE?" : "RESTORE VEHICLE?"}
        message={`Are you sure you want to ${statusModalConfig.action === "DELETE" ? "deactivate" : "restore"} ${statusModalConfig.vehicleName}?`}
        confirmText={statusModalConfig.action === "DELETE" ? "DEACTIVATE" : "RESTORE"}
        type={statusModalConfig.action === "DELETE" ? "danger" : "success"}
      />

      <StartAuctionModal
        isOpen={startAuctionModal.isOpen}
        onClose={() => setStartAuctionModal({ isOpen: false, vehicleId: null })}
        onConfirm={(payload) => createAuctionMutation.mutate(payload)}
        isLoading={createAuctionMutation.isPending}
        vehicleId={startAuctionModal.vehicleId || ""}
      />
    </div>
  );
};

export default MyVehicles;
