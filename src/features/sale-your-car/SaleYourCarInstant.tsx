"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import HeroSection from "@/features/sale-your-car/HeroSection";
import CarInformationForm from "@/features/sale-your-car/CarInformationForm";
import ContactInformationForm from "@/features/sale-your-car/ContactInformationForm";
import AppDownloadSection from "@/features/sale-your-car/AppDownloadSection";
import { VehicleSaleFormProvider, useVehicleSaleForm } from "./VehicleSaleFormContext";
import { submitVehicleSale, fetchVehicleById, updateVehicle } from "@/store/thunks/vehicleSaleThunks";
import { clearError, clearSuccess, resetState } from "@/store/slices/vehicleSaleSlice";
import type { AppDispatch, RootState } from "@/store";
import Button from "@/components/common/Button";
import { mapVehicleToFormData } from "@/utils/vehicleUtils";

interface SaleYourCarInstantContentProps {
  editVehicleId?: string;
}

function SaleYourCarInstantContent({ editVehicleId }: SaleYourCarInstantContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { formData, getFormData, resetForm, updateFormData } = useVehicleSaleForm();
  const { isLoading, error, success, editingVehicle, editingVehicleLoading } = useSelector(
    (state: RootState) => state.vehicleSale
  );

  // Fetch vehicle data if in edit mode
  useEffect(() => {
    if (editVehicleId) {
      dispatch(fetchVehicleById(editVehicleId));
    }
  }, [editVehicleId, dispatch]);

  // Pre-fill form when vehicle data is loaded
  useEffect(() => {
    if (editingVehicle && editVehicleId) {
      const formData = mapVehicleToFormData(editingVehicle);
      updateFormData(formData);
    }
  }, [editingVehicle, editVehicleId, updateFormData]);

  useEffect(() => {
    if (success) {
      // Clear success state after showing message
      dispatch(clearSuccess());
      // Optionally redirect or show success message
      // router.push("/dashboard");
    }
  }, [success, dispatch]);

  const handleSubmit = async () => {
    const data = getFormData();
    
    // Validate required fields
    if (!data.make || !data.model || !data.year || !data.transmission || 
        !data.mileage || !data.description || !data.mobileNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Clear any previous errors
    dispatch(clearError());

    // Prepare form data for submission
    const submitData = {
      ...data,
      description: data.description || "",
      type: "instant",
    } as any;

    // If editing, use updateVehicle, otherwise use submitVehicleSale
    if (editVehicleId) {
      const result = await dispatch(updateVehicle({ vehicleId: editVehicleId, formData: submitData }));
      
      if (updateVehicle.fulfilled.match(result)) {
        toast.success("Vehicle updated successfully!");
        resetForm();
        dispatch(resetState());
        router.push("/dashboard/my-vehicle");
      } else if (updateVehicle.rejected.match(result)) {
        toast.error(result.payload || "Failed to update vehicle. Please try again.");
      }
    } else {
      const result = await dispatch(submitVehicleSale(submitData));
      
      if (submitVehicleSale.fulfilled.match(result)) {
        toast.success("Vehicle submitted successfully!");
        resetForm();
        dispatch(resetState());
        router.push("/dashboard/my-vehicle");
      } else if (submitVehicleSale.rejected.match(result)) {
        toast.error(result.payload || "Failed to submit vehicle. Please try again.");
      }
    }
  };

  return (
    <div className="w-full mt-16">
      <HeroSection />
      {error && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
            {error}
          </div>
        </div>
      )}
      <CarInformationForm />
      <ContactInformationForm onSubmit={handleSubmit} isLoading={isLoading} />
      <AppDownloadSection />
    </div>
  );
}

interface SaleYourCarInstantProps {
  editVehicleId?: string;
}

export default function SaleYourCarInstant({ editVehicleId }: SaleYourCarInstantProps) {
  return (
    <VehicleSaleFormProvider>
      <SaleYourCarInstantContent editVehicleId={editVehicleId} />
    </VehicleSaleFormProvider>
  );
}



