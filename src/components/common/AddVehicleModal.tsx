import React, { useState } from "react";
import CrossIcon from "../svgs/CrossIcon";
import SettingsInput from "./SettingsInput";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: { vehicleId: string; minimumBidAmount: number; bidIncrement: number }) => void;
  isPending: boolean;
}

const AddVehicleModal = ({
  isOpen,
  onClose,
  onConfirm,
  isPending,
}: AddVehicleModalProps) => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    minimumBidAmount: "",
    bidIncrement: "",
  });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (formData.vehicleId && formData.minimumBidAmount && formData.bidIncrement) {
      onConfirm({
        vehicleId: formData.vehicleId,
        minimumBidAmount: Number(formData.minimumBidAmount),
        bidIncrement: Number(formData.bidIncrement),
      });
      setFormData({ vehicleId: "", minimumBidAmount: "", bidIncrement: "" });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <CrossIcon />
        </button>

        <div className="flex flex-col">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-widest font-['Chakra_Petch']"
          >
            ADD VEHICLE TO AUCTION
          </h2>

          <div className="space-y-6">
            <SettingsInput
              label="Vehicle ID"
              placeholder="Enter Vehicle ID"
              value={formData.vehicleId}
              onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
            />
            <SettingsInput
              label="Minimum Bid Amount (AED)"
              placeholder="e.g. 50000"
              type="number"
              value={formData.minimumBidAmount}
              onChange={(e) => setFormData({ ...formData, minimumBidAmount: e.target.value })}
            />
            <SettingsInput
              label="Bid Increment (AED)"
              placeholder="e.g. 5000"
              type="number"
              value={formData.bidIncrement}
              onChange={(e) => setFormData({ ...formData, bidIncrement: e.target.value })}
            />
          </div>

          <div className="flex gap-4 mt-8 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 uppercase font-semibold transition-colors"
              style={{
                borderColor: "#DC3729",
                color: "#DC3729",
                backgroundColor: "white",
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleConfirm}
              disabled={isPending || !formData.vehicleId || !formData.minimumBidAmount || !formData.bidIncrement}
              className="flex-1 py-3 px-6 uppercase font-semibold text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: "#DC3729" }}
            >
              {isPending ? "ADDING..." : "ADD VEHICLE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleModal;
