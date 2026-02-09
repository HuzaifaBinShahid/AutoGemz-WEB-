"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import HeroSection3Step from "@/features/sale-your-car/HeroSection3Step";
import CarInformationForm3Step from "@/features/sale-your-car/CarInformationForm3Step";
import UploadMediaSection from "@/features/sale-your-car/UploadMediaSection";
import LocationSection from "@/features/sale-your-car/LocationSection";
import ContactInformationForm3Step from "@/features/sale-your-car/ContactInformationForm3Step";
import AppDownloadSection from "@/features/sale-your-car/AppDownloadSection";
import { VehicleSaleFormProvider, useVehicleSaleForm } from "./VehicleSaleFormContext";
import { submitVehicleSale, fetchVehicleById, updateVehicle } from "@/store/thunks/vehicleSaleThunks";
import { clearError, clearSuccess, resetState } from "@/store/slices/vehicleSaleSlice";
import type { AppDispatch, RootState } from "@/store";
import { mapVehicleToFormData } from "@/utils/vehicleUtils";

interface SaleYourCar3StepContentProps {
  editVehicleId?: string;
}

function SaleYourCar3StepContent({ editVehicleId }: SaleYourCar3StepContentProps) {
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
      dispatch(clearSuccess());
      // router.push("/dashboard");
    }
  }, [success, dispatch]);

  const handleSubmit = async () => {
    const data = getFormData();
    
    // Validate required fields
    if (!data.make || !data.model || !data.year || !data.transmission || 
        !data.mileage || !data.description || !data.mobileNumber || 
        !data.price || !data.city || !data.state) {
      toast.error("Please fill in all required fields");
      return;
    }

    dispatch(clearError());

    const submitData = {
      ...data,
      description: data.description || "",
      type: "3step",
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
      <HeroSection3Step activeStep={1} />
      {error && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
            {error}
          </div>
        </div>
      )}
      <CarInformationForm3Step />
      <UploadMediaSection />
      <LocationSection />
      <ContactInformationForm3Step onSubmit={handleSubmit} isLoading={isLoading} />
      <AppDownloadSection />
    </div>
  );
}

interface SaleYourCar3StepProps {
  editVehicleId?: string;
}

export default function SaleYourCar3Step({ editVehicleId }: SaleYourCar3StepProps) {
  return (
    <VehicleSaleFormProvider>
      <SaleYourCar3StepContent editVehicleId={editVehicleId} />
    </VehicleSaleFormProvider>
  );
}

