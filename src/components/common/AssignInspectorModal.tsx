import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import CrossIcon from "../svgs/CrossIcon";

interface AssignInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inspectorId: string) => void;
  isLoading?: boolean;
}

const AssignInspectorModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading: isAssigning,
}: AssignInspectorModalProps) => {
  const [selectedInspectorId, setSelectedInspectorId] = useState<string>("");

  const { data, isLoading: isLoadingInspectors } = useQuery({
    queryKey: ["inspectors"],
    queryFn: () => userService.getUsers({ role: "inspector", limit: 100 }),
    enabled: isOpen,
  });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (selectedInspectorId) {
      onConfirm(selectedInspectorId);
    }
  };

  const inspectors = data?.results || [];

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase">Assign Inspector</h2>
          <p className="text-gray-600 mb-6">Select an inspector to assign to this vehicle.</p>

          <div className="space-y-3 max-h-60 overflow-y-auto mb-6 pr-2">
            {isLoadingInspectors ? (
              <p className="text-center py-4 text-gray-500">Loading inspectors...</p>
            ) : inspectors.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No inspectors found.</p>
            ) : (
              inspectors.map((inspector: any) => (
                <label
                  key={inspector.id}
                  className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedInspectorId === inspector.id
                      ? "border-autogemz-orange bg-orange-50"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="inspector"
                    value={inspector.id}
                    checked={selectedInspectorId === inspector.id}
                    onChange={(e) => setSelectedInspectorId(e.target.value)}
                    className="w-5 h-5 text-autogemz-orange"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-semibold">{inspector.firstName} {inspector.lastName}</span>
                    <span className="text-gray-500 text-sm">{inspector.email}</span>
                  </div>
                </label>
              ))
            )}
          </div>

          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 uppercase font-semibold transition-colors border-[#DC3729] text-[#DC3729] bg-white hover:bg-red-50"
            >
              CANCEL
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedInspectorId || isAssigning}
              className={`flex-1 py-3 px-6 uppercase font-semibold text-white transition-colors ${
                !selectedInspectorId || isAssigning ? "bg-gray-400 cursor-not-allowed" : "bg-autogemz-orange hover:bg-opacity-90"
              }`}
            >
              {isAssigning ? "ASSIGNING..." : "CONFIRM"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignInspectorModal;
