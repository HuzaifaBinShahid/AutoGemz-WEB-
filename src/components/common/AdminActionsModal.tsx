import React, { useState } from "react";
import CrossIcon from "../svgs/CrossIcon";

interface AdminActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: string) => void;
}

const AdminActionsModal = ({
  isOpen,
  onClose,
  onConfirm,
}: AdminActionsModalProps) => {
  const [selectedAction, setSelectedAction] = useState("Download Receipt");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedAction);
    onClose();
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ADMIN ACTIONS</h2>
          <p className="text-gray-600 mb-6">What would you like to do with this Receipt?</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <label className="flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="action"
                value="Download Receipt"
                checked={selectedAction === "Download Receipt"}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-5 h-5 text-autogemz-orange"
              />
              <span className="text-gray-900">Download Receipt</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="action"
                value="Update Status"
                checked={selectedAction === "Update Status"}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-5 h-5 text-autogemz-orange"
              />
              <span className="text-gray-900">Update Status</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="action"
                value="Issue Refund"
                checked={selectedAction === "Issue Refund"}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-5 h-5 text-autogemz-orange"
              />
              <span className="text-gray-900">Issue Refund</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="action"
                value="Contact Buyer"
                checked={selectedAction === "Contact Buyer"}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-5 h-5 text-autogemz-orange!"
              />
              <span className="text-gray-900">Contact Buyer</span>
            </label>
          </div>

          <div className="flex gap-4 w-full">
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
              className="flex-1 py-3 px-6 uppercase font-semibold text-white transition-colors"
              style={{ backgroundColor: "#DC3729" }}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActionsModal;
