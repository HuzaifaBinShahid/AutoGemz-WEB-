import React from "react";

import CrossIcon from "../svgs/CrossIcon";
import DeleteWarning from "../svgs/DeleteWarning"; 

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "DELETE USER?",
  message = "Are you sure you want to delete this user?",
  confirmText = "DELETE",
  cancelText = "CANCEL",
}: DeleteModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs border border-gray-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <CrossIcon />
        </button>

        <div className="flex flex-col items-center">
          <div className="mb-6">
            <DeleteWarning />
          </div>

          <h2
            className="mb-4 text-center uppercase"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 600,
              fontSize: "36px",
              lineHeight: "47px",
              color: "#494949",
            }}
          >
            {title}
          </h2>

          <p
            className="mb-8 text-center"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 300,
              fontSize: "18px",
              lineHeight: "28px",
              color: "#ABABAB",
            }}
          >
            {message}
            <br />
            This action cannot be undone.
          </p>

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
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-6 uppercase font-semibold text-white transition-colors"
              style={{ backgroundColor: "#DC3729" }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
