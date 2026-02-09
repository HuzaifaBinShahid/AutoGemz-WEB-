import type { VehicleSaleFormData } from "@/interfaces";

/**
 * Maps vehicle data from API response to VehicleSaleFormData format
 */
export const mapVehicleToFormData = (vehicle: any): Partial<VehicleSaleFormData> => {
  return {
    make: vehicle.make || "",
    model: vehicle.model || "",
    year: vehicle.year?.toString() || "",
    vin: vehicle.vin || "",
    transmission: vehicle.transmission || "",
    mileage: vehicle.mileage?.toString() || "",
    price: vehicle.price?.toString() || "",
    description: vehicle.description || "",
    additionalDetails: vehicle.additionalDetails || "",
    registrationCity: vehicle.city || "",
    city: vehicle.city || "",
    state: vehicle.state || "",
    mobileNumber: vehicle.mobileNumber || "",
    secondaryNumber: vehicle.secondaryNumber || "",
    allowWhatsApp: vehicle.allowWhatpsAppContact || false,
    requestInspection: vehicle.freeinspectionRequest || false,
    // Images from API are URLs (strings), not Files
    images: vehicle.images || [],
  };
};

