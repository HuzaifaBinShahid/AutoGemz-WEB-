import React from "react";
import CrossIcon from "../svgs/CrossIcon";

interface AssignConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  isLoading?: boolean;
}

const AssignConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
  isLoading,
}: AssignConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <CrossIcon />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#DC3729" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase">Confirm Assignment</h2>
          <p className="text-gray-600 mb-8">
            Are you sure you want to assign this vehicle to <span className="font-bold text-gray-900">{userName}</span>?
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 uppercase font-semibold transition-colors border-gray-200 text-gray-600 hover:bg-gray-50 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3 px-6 uppercase font-semibold text-white transition-colors bg-autogemz-orange hover:bg-opacity-90 rounded disabled:opacity-50"
            >
              {isLoading ? "Assigning..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignConfirmationModal;
