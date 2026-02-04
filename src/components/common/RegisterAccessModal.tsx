import React, { useState } from "react";
import CrossIcon from "../svgs/CrossIcon";
import SettingsInput from "./SettingsInput";

interface RegisterAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentAmount: number) => void;
  isPending: boolean;
  vehicleName: string;
}

const RegisterAccessModal = ({
  isOpen,
  onClose,
  onConfirm,
  isPending,
  vehicleName,
}: RegisterAccessModalProps) => {
  const [paymentAmount, setPaymentAmount] = useState("");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (paymentAmount) {
      onConfirm(Number(paymentAmount));
      setPaymentAmount("");
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
            className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-widest font-['Chakra_Petch']"
          >
            REGISTER ACCESS
          </h2>
          <p className="text-gray-600 mb-6">Registering payment for <strong>{vehicleName}</strong></p>

          <div className="space-y-6">
            <SettingsInput
              label="Payment Amount (AED)"
              placeholder="Enter amount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mt-8 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 uppercase font-semibold transition-colors"
              style={{
                borderColor: "#3EB549",
                color: "#3EB549",
                backgroundColor: "white",
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleConfirm}
              disabled={isPending || !paymentAmount}
              className="flex-1 py-3 px-6 uppercase font-semibold text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: "#3EB549" }}
            >
              {isPending ? "REGISTERING..." : "REGISTER ACCESS"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccessModal;
