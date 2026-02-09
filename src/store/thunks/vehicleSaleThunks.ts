import { createAsyncThunk } from "@reduxjs/toolkit";
import type { VehicleSaleFormData, VehicleSaleResponse } from "@/interfaces";
import api from "@/lib/api";

// Interface for pagination parameters
export interface FetchSellingVehiclesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  status?: "all" | "unsold" | "sold";
}

// Interface for paginated response
export interface SellingVehiclesResponse {
  vehicles: any[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Helper function to convert File to base64 data URL
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Submit vehicle sale thunk
export const submitVehicleSale = createAsyncThunk<
  VehicleSaleResponse,
  VehicleSaleFormData,
  { rejectValue: string }
>(
  "vehicleSale/submit",
  async (formData, { rejectWithValue }) => {
    try {
      // Check if there are File objects to upload
      const hasFiles = formData.images && formData.images.some((img) => img instanceof File);
      
      // If there are files, use FormData; otherwise use JSON
      if (hasFiles) {
        const formDataToSend = new FormData();
        
        // Add all form fields
        formDataToSend.append("make", formData.make || "");
        formDataToSend.append("model", formData.model || "");
        formDataToSend.append("year", typeof formData.year === "string" ? formData.year : String(formData.year || ""));
        formDataToSend.append("transmission", formData.transmission?.toLowerCase() || "");
        formDataToSend.append("vin", formData.vin || "");
        formDataToSend.append("mileage", typeof formData.mileage === "string" ? formData.mileage : String(formData.mileage || ""));
        formDataToSend.append("description", formData.description || "");
        formDataToSend.append("mobileNumber", formData.mobileNumber || "");
        formDataToSend.append("allowWhatpsAppContact", String(formData.allowWhatsApp || false));
        formDataToSend.append("type", formData.type || "");

        // Add optional fields
        if (formData.price) {
          formDataToSend.append("price", typeof formData.price === "string" ? formData.price : String(formData.price));
        }
        if (formData.additionalDetails) {
          formDataToSend.append("additionalDetails", formData.additionalDetails);
        }
        if (formData.secondaryNumber) {
          formDataToSend.append("secondaryNumber", formData.secondaryNumber);
        }

        // Handle location
        const city = formData.city || formData.registrationCity;
        if (city) {
          formDataToSend.append("city", city);
        }
        if (formData.state) {
          formDataToSend.append("state", formData.state);
        }
        if (formData.requestInspection !== undefined) {
          formDataToSend.append("freeinspectionRequest", String(formData.requestInspection));
        }

        // Add files (only File objects, not URLs)
        if (formData.images) {
          formData.images.forEach((img) => {
            if (img instanceof File) {
              formDataToSend.append("images", img);
            }
          });
        }

        // Make API call with FormData
        const response = await api.post("/vehicles/sell-your-vehicle", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data;
      } else {
        // No files, use JSON (for backward compatibility or when only URLs are provided)
        const requestBody: any = {
          make: formData.make,
          model: formData.model,
          year: typeof formData.year === "string" ? parseInt(formData.year) : formData.year,
          transmission: formData.transmission.toLowerCase(),
          vin: formData.vin,
          mileage: typeof formData.mileage === "string" ? parseInt(formData.mileage) : formData.mileage,
          description: formData.description,
          mobileNumber: formData.mobileNumber,
          allowWhatpsAppContact: formData.allowWhatsApp,
          type: formData.type,
        };

        // Add optional fields
        if (formData.price) {
          requestBody.price = typeof formData.price === "string" ? parseInt(formData.price) : formData.price;
        }
        if (formData.additionalDetails) {
          requestBody.additionalDetails = formData.additionalDetails;
        }
        if (formData.secondaryNumber) {
          requestBody.secondaryNumber = formData.secondaryNumber;
        }

        // Handle location
        const city = formData.city || formData.registrationCity;
        if (city) {
          requestBody.city = city;
        }
        if (formData.state) {
          requestBody.state = formData.state;
        }
        if (formData.requestInspection !== undefined) {
          requestBody.freeinspectionRequest = formData.requestInspection;
        }

        // Add image URLs if they exist (strings only)
        if (formData.images) {
          const imageUrls = formData.images.filter((img): img is string => typeof img === "string");
          if (imageUrls.length > 0) {
            requestBody.images = imageUrls;
          }
        }

        // Make API call with JSON body
        const response = await api.post("/vehicles/sell-your-vehicle", requestBody);

        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit vehicle sale"
      );
    }
  }
);

// Fetch selling vehicles thunk
export const fetchSellingVehicles = createAsyncThunk<
  SellingVehiclesResponse,
  FetchSellingVehiclesParams,
  { rejectValue: string }
>(
  "vehicleSale/fetchSellingVehicles",
  async (params, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, sortBy = "createdAt:desc", status } = params;
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
      });

      // Add status filter if provided (backend might handle this differently)
      // For now, we'll fetch all and filter client-side if needed
      
      const response = await api.get(`/vehicles/selling-vehicles?${queryParams.toString()}`);
      
      // Transform response to match our expected format
      // API response structure: { message, data: { results, page, limit, totalPages, totalResults } }
      const responseData = response.data;
      const data = responseData.data || {};
      const vehicles = data.results || [];
      const totalItems = data.totalResults || 0;
      const itemsPerPage = data.limit || limit;
      const currentPageNum = data.page || page;
      const totalPages = data.totalPages || 1;
      
      return {
        vehicles,
        pagination: {
          currentPage: currentPageNum,
          totalPages: totalPages > 0 ? totalPages : 1,
          totalItems,
          itemsPerPage,
          hasNextPage: currentPageNum < totalPages,
          hasPreviousPage: currentPageNum > 1,
        },
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch selling vehicles"
      );
    }
  }
);

// Delete vehicle thunk
export const deleteVehicle = createAsyncThunk<
  { message: string; vehicleId: string },
  string,
  { rejectValue: string }
>(
  "vehicleSale/deleteVehicle",
  async (vehicleId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/vehicles/${vehicleId}/delete`);
      return {
        message: response.data?.message || "Vehicle deleted successfully",
        vehicleId,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete vehicle"
      );
    }
  }
);

// Fetch vehicle by ID thunk
export const fetchVehicleById = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "vehicleSale/fetchVehicleById",
  async (vehicleId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/vehicles/${vehicleId}`);
      return response.data?.data || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vehicle"
      );
    }
  }
);

// Update vehicle thunk
export const updateVehicle = createAsyncThunk<
  any,
  { vehicleId: string; formData: VehicleSaleFormData },
  { rejectValue: string }
>(
  "vehicleSale/updateVehicle",
  async ({ vehicleId, formData }, { rejectWithValue }) => {
    try {
      // Check if there are File objects to upload
      const hasFiles = formData.images && formData.images.some((img) => img instanceof File);
      
      // If there are files, use FormData; otherwise use JSON
      if (hasFiles) {
        const formDataToSend = new FormData();
        
        // Add all form fields
        if (formData.make) formDataToSend.append("make", formData.make);
        if (formData.model) formDataToSend.append("model", formData.model);
        if (formData.year) {
          formDataToSend.append("year", typeof formData.year === "string" ? formData.year : String(formData.year));
        }
        if (formData.transmission) {
          formDataToSend.append("transmission", formData.transmission.toLowerCase());
        }
        if (formData.vin) formDataToSend.append("vin", formData.vin);
        if (formData.mileage) {
          formDataToSend.append("mileage", typeof formData.mileage === "string" ? formData.mileage : String(formData.mileage));
        }
        if (formData.description) formDataToSend.append("description", formData.description);
        if (formData.mobileNumber) formDataToSend.append("mobileNumber", formData.mobileNumber);
        if (formData.allowWhatsApp !== undefined) {
          formDataToSend.append("allowWhatpsAppContact", String(formData.allowWhatsApp));
        }
        if (formData.type) formDataToSend.append("type", formData.type);

        // Add optional fields
        if (formData.price) {
          formDataToSend.append("price", typeof formData.price === "string" ? formData.price : String(formData.price));
        }
        if (formData.additionalDetails) {
          formDataToSend.append("additionalDetails", formData.additionalDetails);
        }
        if (formData.secondaryNumber) {
          formDataToSend.append("secondaryNumber", formData.secondaryNumber);
        }

        // Handle location
        const city = formData.city || formData.registrationCity;
        if (city) {
          formDataToSend.append("city", city);
        }
        if (formData.state) {
          formDataToSend.append("state", formData.state);
        }
        if (formData.requestInspection !== undefined) {
          formDataToSend.append("freeinspectionRequest", String(formData.requestInspection));
        }

        // Add files (only File objects, not URLs)
        if (formData.images) {
          formData.images.forEach((img) => {
            if (img instanceof File) {
              formDataToSend.append("images", img);
            }
          });
        }

        // Make API call with FormData
        const response = await api.patch(`/vehicles/${vehicleId}/edit`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data?.data || response.data;
      } else {
        // No files, use JSON
        const requestBody: any = {};

        // Add only provided fields
        if (formData.make) requestBody.make = formData.make;
        if (formData.model) requestBody.model = formData.model;
        if (formData.year) {
          requestBody.year = typeof formData.year === "string" ? parseInt(formData.year) : formData.year;
        }
        if (formData.transmission) {
          requestBody.transmission = formData.transmission.toLowerCase();
        }
        if (formData.vin) requestBody.vin = formData.vin;
        if (formData.mileage) {
          requestBody.mileage = typeof formData.mileage === "string" ? parseInt(formData.mileage) : formData.mileage;
        }
        if (formData.description) requestBody.description = formData.description;
        if (formData.mobileNumber) requestBody.mobileNumber = formData.mobileNumber;
        if (formData.allowWhatsApp !== undefined) {
          requestBody.allowWhatpsAppContact = formData.allowWhatsApp;
        }
        if (formData.type) requestBody.type = formData.type;

        // Add optional fields
        if (formData.price) {
          requestBody.price = typeof formData.price === "string" ? parseInt(formData.price) : formData.price;
        }
        if (formData.additionalDetails) {
          requestBody.additionalDetails = formData.additionalDetails;
        }
        if (formData.secondaryNumber) {
          requestBody.secondaryNumber = formData.secondaryNumber;
        }

        // Handle location
        const city = formData.city || formData.registrationCity;
        if (city) {
          requestBody.city = city;
        }
        if (formData.state) {
          requestBody.state = formData.state;
        }
        if (formData.requestInspection !== undefined) {
          requestBody.freeinspectionRequest = formData.requestInspection;
        }

        // Add image URLs if they exist (strings only)
        if (formData.images) {
          const imageUrls = formData.images.filter((img): img is string => typeof img === "string");
          if (imageUrls.length > 0) {
            requestBody.images = imageUrls;
          }
        }

        // Make API call with PATCH method
        const response = await api.patch(`/vehicles/${vehicleId}/edit`, requestBody);

        return response.data?.data || response.data;
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update vehicle"
      );
    }
  }
);

