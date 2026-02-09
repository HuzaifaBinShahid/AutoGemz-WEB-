"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { VehicleSaleFormData } from "@/interfaces";

interface VehicleSaleFormContextType {
  formData: Partial<VehicleSaleFormData>;
  resetKey: number; // Increments on each reset to trigger component updates
  updateFormData: (data: Partial<VehicleSaleFormData>) => void;
  updateCarInfo: (data: Partial<VehicleSaleFormData>) => void;
  updateContactInfo: (data: Partial<VehicleSaleFormData>) => void;
  updateLocationInfo: (data: Partial<VehicleSaleFormData>) => void;
  updateImages: (images: (File | string)[]) => void;
  resetForm: () => void;
  getFormData: () => Partial<VehicleSaleFormData>;
}

const VehicleSaleFormContext = createContext<VehicleSaleFormContextType | undefined>(undefined);

export const useVehicleSaleForm = () => {
  const context = useContext(VehicleSaleFormContext);
  if (!context) {
    throw new Error("useVehicleSaleForm must be used within VehicleSaleFormProvider");
  }
  return context;
};

interface VehicleSaleFormProviderProps {
  children: React.ReactNode;
  initialData?: Partial<VehicleSaleFormData>;
}

export const VehicleSaleFormProvider: React.FC<VehicleSaleFormProviderProps> = ({ 
  children, 
  initialData 
}) => {
  const [formData, setFormData] = useState<Partial<VehicleSaleFormData>>(initialData || {});
  const [resetKey, setResetKey] = useState(0);

  const updateFormData = useCallback((data: Partial<VehicleSaleFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const updateCarInfo = useCallback((data: Partial<VehicleSaleFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const updateContactInfo = useCallback((data: Partial<VehicleSaleFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const updateLocationInfo = useCallback((data: Partial<VehicleSaleFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const updateImages = useCallback((images: (File | string)[]) => {
    setFormData((prev) => ({ ...prev, images }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialData || {});
    setResetKey((prev) => prev + 1); // Increment to trigger reset in components
  }, [initialData]);
  
  // Update form data when initialData changes (for edit mode)
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const getFormData = useCallback(() => {
    return formData;
  }, [formData]);

  return (
    <VehicleSaleFormContext.Provider
      value={{
        formData,
        resetKey,
        updateFormData,
        updateCarInfo,
        updateContactInfo,
        updateLocationInfo,
        updateImages,
        resetForm,
        getFormData,
      }}
    >
      {children}
    </VehicleSaleFormContext.Provider>
  );
};

