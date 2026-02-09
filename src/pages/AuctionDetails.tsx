import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import DeleteIcon from "../components/svgs/DeleteIcon";
import DeleteModal from "../components/common/DeleteModal";
import AdminActionsModal from "../components/common/AdminActionsModal";
import CarSpecification from "../components/PaymentDetails/CarSpecification";
import BidActivity from "../components/AuctionDetails/BidActivity";
import BuyerInformation from "../components/PaymentDetails/BuyerInformation";
import LocationIcon from "../components/svgs/LocationIcon";
import SettingsInput from "../components/common/SettingsInput";
import StatusModal from "../components/common/StatusModal";
import AddVehicleModal from "../components/common/AddVehicleModal";
import RegisterAccessModal from "../components/common/RegisterAccessModal";
import { auctionService } from "../services/auctionService";
import type { Auction } from "../services/auctionService";

const AuctionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAdminActionsModalOpen, setIsAdminActionsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isRegisterAccessModalOpen, setIsRegisterAccessModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<{ id: string; name: string } | null>(null);
  const [modalConfig, setModalConfig] = useState<{ title: string; message: string; onConfirm: () => void; type: "danger" | "success" }>({
    title: "",
    message: "",
    onConfirm: () => {},
    type: "danger",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Auction>>({});

  const { data: auction, isLoading, isError } = useQuery({
    queryKey: ['auction', id],
    queryFn: () => auctionService.getAuctionById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (auction) {
      setFormData(auction);
    }
  }, [auction]);

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<Auction>) => auctionService.updateAuction(id!, payload),
    onSuccess: () => {
      toast.success("Auction updated successfully");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['auction', id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update auction");
    },
  });

  const selectWinnerMutation = useMutation({
    mutationFn: (vehicleId: string) => auctionService.selectWinner(id!, vehicleId),
    onSuccess: () => {
      toast.success("Winner selected successfully");
      setIsStatusModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['auction', id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to select winner");
    },
  });

  const endAuctionMutation = useMutation({
    mutationFn: (winnerId?: string) => auctionService.endAuction(id!, winnerId),
    onSuccess: () => {
      toast.success("Auction ended successfully");
      setIsStatusModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['auction', id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to end auction");
    },
  });

  const addVehicleMutation = useMutation({
    mutationFn: (payload: { vehicleId: string; minimumBidAmount: number; bidIncrement: number }) => 
      auctionService.addVehicleToAuction(id!, payload),
    onSuccess: () => {
      toast.success("Vehicle added to auction successfully");
      setIsAddVehicleModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['auction', id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add vehicle");
    },
  });

  const removeVehicleMutation = useMutation({
    mutationFn: (vehicleId: string) => auctionService.removeVehicleFromAuction(id!, vehicleId),
    onSuccess: () => {
      toast.success("Vehicle removed from auction successfully");
      setIsStatusModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['auction', id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to remove vehicle");
    },
  });

  const registerAccessMutation = useMutation({
    mutationFn: (payload: { vehicleId: string; paymentAmount: number }) => 
      auctionService.registerVehicleAccess(id!, payload.vehicleId, payload.paymentAmount),
    onSuccess: () => {
      toast.success("Vehicle access registered successfully");
      setIsRegisterAccessModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['auction', id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to register access");
    },
  });

  const handleInputChange = (field: keyof Auction, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      maxParticipants: formData.maxParticipants || null
    };
    updateMutation.mutate(payload as any);
  };

  const statusColors: Record<string, string> = {
    LIVE: "#29DC9780",
    ACTIVE: "#29DC9780",
    "PENDING REVIEW": "#F59E0B",
    PENDING: "#F59E0B",
    SCHEDULED: "#19ADD9",
    COMPLETED: "#3EB549",
    CANCELLED: "#DC3729",
  };

  const bids = [
    {
      id: 1,
      rank: 61,
      bidder: {
        image: "https://ui-avatars.com/api/?name=Ahmed+Saleem&background=random",
        name: "Ahmed Saleem",
      },
      bid: "12,00,00",
      placed: "39 minutes ago",
    },
    {
      id: 2,
      rank: 62,
      bidder: {
        image: "https://ui-avatars.com/api/?name=Sara+Charle&background=random",
        name: "Sara Charle",
      },
      bid: "11,00,00",
      placed: "02 minutes ago",
    },
    {
      id: 3,
      rank: 63,
      bidder: {
        image: "https://ui-avatars.com/api/?name=Harry+Lincons&background=random",
        name: "Harry Lincons",
      },
      bid: "10,00,00",
      placed: "09 minutes ago",
    },
    {
      id: 4,
      rank: 64,
      bidder: {
        image: "https://ui-avatars.com/api/?name=Mehew+Jame&background=random",
        name: "Mehew Jame",
        isYou: true,
      },
      bid: "9,00,00",
      placed: "30 minutes ago",
    },
  ];

  const handleAdminActionsClose = () => {
    setIsAdminActionsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Implement delete logic here if needed
    setIsDeleteModalOpen(false);
    navigate("/auctions");
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleAdminActionConfirm = (action: string) => {
    console.log("Selected action:", action);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#F2F2F2] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-autogemz-orange"></div>
      </div>
    );
  }

  if (isError || !auction) {
    return (
      <div className="p-6 bg-[#F2F2F2] min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">Failed to load auction details. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F2F2F2] min-h-screen">
      <div
        className="bg-white p-6"
        style={{
          boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
          borderRadius: "0",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-xl font-semibold text-gray-900 uppercase"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "32px",
              letterSpacing: "0.14em",
              verticalAlign: "middle",
            }}
          >
            Auction Details
          </h2>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="px-6 py-2 text-[14px] uppercase font-semibold text-white transition-colors bg-autogemz-orange disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(auction || {});
                  }}
                  className="px-6 py-2 text-[14px] uppercase font-semibold text-[#DC3729] border border-[#DC3729] transition-colors bg-white font-bold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setModalConfig({
                      title: "END AUCTION?",
                      message: "Are you sure you want to end this auction manually? This action will finalize the bidding.",
                      onConfirm: () => endAuctionMutation.mutate(undefined),
                      type: "danger",
                    });
                    setIsStatusModalOpen(true);
                  }}
                  disabled={endAuctionMutation.isPending}
                  className="px-4 text-[14px] uppercase font-semibold text-white transition-colors bg-red-600 disabled:opacity-50"
                >
                  {endAuctionMutation.isPending ? "Ending..." : "End Auction"}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 text-[14px] uppercase font-semibold text-white transition-colors bg-autogemz-orange"
                >
                  Edit
                </button>
              </>
            )}
            <button
              onClick={handleDeleteClick}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>

        <div className="border border-[#1F29371A] w-full my-4"></div>

        <div className="flex gap-6">
          <div className="shrink-0 w-1/3">
            <img
              src={formData?.vehicles?.[0] ? `https://placehold.co/600x400?text=Vehicle+Image` : "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400"}
              alt={formData?.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-6 pl-6 border-l border-[#1F29371A]">
            {isEditing ? (
              <div className="space-y-6">
                <SettingsInput
                  label="Auction Title"
                  value={formData.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
                <SettingsInput
                  label="Description"
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <SettingsInput
                    label="Start Date"
                    type="datetime-local"
                    value={formData.startDate ? new Date(formData.startDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                  <SettingsInput
                    label="End Date"
                    type="datetime-local"
                    value={formData.endDate ? new Date(formData.endDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 uppercase tracking-widest font-['Chakra_Petch']">
                      {auction?.title}
                    </h3>
                    <p className="text-gray-500 mt-1">{auction?.id}</p>
                  </div>
                  <p
                    className="inline-block px-4 py-2 rounded-xl text-sm font-medium text-black border border-[#29DC9780]"
                    style={{ backgroundColor: statusColors[auction?.status?.toUpperCase() || "PENDING"] }}
                  >
                    {auction?.status}
                  </p>
                </div>

                <div className="border-t border-[#1F29371A] w-full" />

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-semibold text-[#A5A5A5] uppercase tracking-widest font-['Chakra_Petch']">
                      Description
                    </p>
                    <p className="text-black text-lg font-medium mt-1">{auction?.description}</p>
                  </div>
                  <div className="flex items-center gap-2 self-start justify-end">
                    <LocationIcon />
                    <span className="text-black text-2xl font-semibold">Lahore</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-semibold text-black uppercase tracking-widest font-['Chakra_Petch']">
                      START DATE: <span className="ml-2 text-gray-600 normal-case">{new Date(auction?.startDate || "").toLocaleString()}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black uppercase tracking-widest font-['Chakra_Petch']">
                      END DATE: <span className="ml-2 text-gray-600 normal-case">{new Date(auction?.endDate || "").toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Vehicles Section */}
        {!isEditing && auction?.vehicles && (
          <div className="mt-8 border-t border-[#1F29371A] pt-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-gray-900 uppercase tracking-widest font-['Chakra_Petch']">
                Auction Vehicles
              </h4>
              <button
                onClick={() => setIsAddVehicleModalOpen(true)}
                disabled={addVehicleMutation.isPending}
                className="px-6 py-2 text-[14px] uppercase font-semibold text-white transition-colors bg-autogemz-orange disabled:opacity-50"
              >
                {addVehicleMutation.isPending ? "Adding..." : "Add Vehicle"}
              </button>
            </div>
            <div className="space-y-4">
              {auction.vehicles.map((v) => (
                <div key={v._id} className="flex justify-between items-center bg-gray-50 p-6 border border-[#1F29371A]">
                  <div>
                    <p className="text-gray-900 font-semibold uppercase">
                      Vehicle: {typeof v.vehicleId === 'object' ? `${v.vehicleId.make} ${v.vehicleId.model}` : v.vehicleId}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Min Bid: <span className="text-black font-medium">AED {v.minimumBidAmount.toLocaleString()}</span> | 
                      Increment: <span className="text-black font-medium">AED {v.bidIncrement.toLocaleString()}</span>
                    </p>
                    {v.winnerId && (
                      <p className="mt-2 text-green-600 font-bold uppercase text-sm">Winner Selected</p>
                    )}
                  </div>
                  <div className="flex gap-4 items-center">
                    {!v.isSold && !v.winnerId && (
                      <button
                        onClick={() => {
                          const vId = typeof v.vehicleId === 'object' ? v.vehicleId.id || v.vehicleId._id : v.vehicleId;
                          const vName = typeof v.vehicleId === 'object' ? `${v.vehicleId.make} ${v.vehicleId.model}` : 'this vehicle';
                          setModalConfig({
                            title: "SELECT WINNER?",
                            message: `Are you sure you want to manually select the winner and end bidding for ${vName}?`,
                            onConfirm: () => selectWinnerMutation.mutate(vId),
                            type: "success",
                          });
                          setIsStatusModalOpen(true);
                        }}
                        disabled={selectWinnerMutation.isPending}
                        className="px-6 py-2 text-[14px] uppercase font-semibold text-white transition-colors bg-[#DC3729] disabled:opacity-50"
                      >
                        {selectWinnerMutation.isPending ? "Ending Bidding..." : "Select Winner / End Bidding"}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const vId = typeof v.vehicleId === 'object' ? v.vehicleId.id || v.vehicleId._id : v.vehicleId;
                        const vName = typeof v.vehicleId === 'object' ? `${v.vehicleId.make} ${v.vehicleId.model}` : 'this vehicle';
                        setSelectedVehicle({ id: vId, name: vName });
                        setIsRegisterAccessModalOpen(true);
                      }}
                      disabled={registerAccessMutation.isPending}
                      className="px-6 py-2 text-[14px] uppercase font-semibold text-blue-600 border border-blue-400 hover:bg-blue-50 disabled:opacity-50"
                    >
                      {registerAccessMutation.isPending ? "Registering..." : "Register Access"}
                    </button>
                    <button
                      onClick={() => {
                        const vId = typeof v.vehicleId === 'object' ? v.vehicleId.id || v.vehicleId._id : v.vehicleId;
                        const vName = typeof v.vehicleId === 'object' ? `${v.vehicleId.make} ${v.vehicleId.model}` : 'this vehicle';
                        setModalConfig({
                          title: "REMOVE VEHICLE?",
                          message: `Are you sure you want to remove ${vName} from the auction?`,
                          onConfirm: () => removeVehicleMutation.mutate(vId),
                          type: "danger",
                        });
                        setIsStatusModalOpen(true);
                      }}
                      disabled={removeVehicleMutation.isPending}
                      className="px-6 py-2 text-[14px] uppercase font-semibold text-gray-600 border border-gray-400 hover:bg-gray-100 disabled:opacity-50"
                    >
                      {removeVehicleMutation.isPending ? "Removing..." : "Remove"}
                    </button>
                    {v.isSold && (
                      <span className="px-6 py-2 text-[14px] uppercase font-bold text-green-600 border border-green-600">
                        Sold
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <CarSpecification
          make="Toyota"
          model="Corolla Altis"
          mileage="106905"
          year={2018}
          mileageKm="72,000 km"
          transmission="Automatic"
          registration="Lahore"
          transactionId="INSP-10457"
        />
      </div>

      <div className="mt-6">
        <BidActivity bids={bids} timeRemaining="1H 45M 3S" />
      </div>

      <div className="mt-6">
        <BuyerInformation
          name="Alex"
          avatar="https://ui-avatars.com/api/?name=Alex&background=random"
          contact="03XXXXXXXXX"
          email="zaina@example.com"
          location="Lahore"
        />
      </div>

      <AdminActionsModal
        isOpen={isAdminActionsModalOpen}
        onClose={handleAdminActionsClose}
        onConfirm={handleAdminActionConfirm}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="DELETE AUCTION?"
        message="Are you sure you want to delete this auction?"
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="CONFIRM"
        type={modalConfig.type}
      />

      <AddVehicleModal
        isOpen={isAddVehicleModalOpen}
        onClose={() => setIsAddVehicleModalOpen(false)}
        onConfirm={(payload) => addVehicleMutation.mutate(payload)}
        isPending={addVehicleMutation.isPending}
      />

      <RegisterAccessModal
        isOpen={isRegisterAccessModalOpen}
        onClose={() => setIsRegisterAccessModalOpen(false)}
        vehicleName={selectedVehicle?.name || ""}
        onConfirm={(amount) => registerAccessMutation.mutate({ vehicleId: selectedVehicle?.id || "", paymentAmount: amount })}
        isPending={registerAccessMutation.isPending}
      />
    </div>
  );
};

export default AuctionDetails;
