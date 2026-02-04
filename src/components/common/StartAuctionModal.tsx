import React, { useState } from "react";
import CrossIcon from "../svgs/CrossIcon";

interface StartAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: any) => void;
  isLoading?: boolean;
  vehicleId: string;
}

const StartAuctionModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  vehicleId,
}: StartAuctionModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    maxParticipants: 100,
  });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      vehicleId,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <CrossIcon />
        </button>

        <form onSubmit={handleConfirm} className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase">Start Auction</h2>
          <p className="text-gray-600 mb-6">Enter the auction details to start bidding for this vehicle.</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">Auction Title</label>
              <input
                required
                type="text"
                placeholder="e.g., Luxury Car Auction"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-autogemz-orange focus:border-autogemz-orange outline-none text-black"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">Description</label>
              <textarea
                required
                rows={3}
                placeholder="e.g., Annual luxury vehicle auction"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-autogemz-orange focus:border-autogemz-orange outline-none text-black"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">Start Date & Time</label>
                <input
                  required
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-autogemz-orange focus:border-autogemz-orange outline-none text-black"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">End Date & Time</label>
                <input
                  required
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-autogemz-orange focus:border-autogemz-orange outline-none text-black"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">Max Participants</label>
              <input
                required
                type="number"
                min={1}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-autogemz-orange focus:border-autogemz-orange outline-none text-black"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 uppercase font-semibold transition-colors border-[#DC3729] text-[#DC3729] bg-white hover:bg-red-50"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 px-6 uppercase font-semibold text-white transition-colors ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-autogemz-orange hover:bg-opacity-90"
              }`}
            >
              {isLoading ? "CREATING..." : "START AUCTION"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartAuctionModal;
