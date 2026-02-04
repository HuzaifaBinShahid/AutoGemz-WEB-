import api from '@/lib/api';
import { ApiEndpoints } from '@/enums/endpoints';

export interface GetVehiclesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
  vin: string;
  mileage: number;
  price: number;
  description: string;
  additionalDetails: string;
  images: string[];
  city: string;
  state: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  mobileNumber: string;
  secondaryNumber: string;
  allowWhatpsAppContact: boolean;
  freeinspectionRequest: boolean;
}

export interface GetVehiclesResponse {
  results: Vehicle[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export const vehicleService = {
  getSellingVehicles: async (params: GetVehiclesParams = {}): Promise<GetVehiclesResponse> => {
    const { page = 1, limit = 10, sortBy = 'createdAt:desc' } = params;
    const response = await api.get(ApiEndpoints.VEHICLES_SELLING, {
      params: { page, limit, sortBy },
    });
    return response.data.data;
  },

  getVehicleById: async (vehicleId: string): Promise<Vehicle> => {
    const response = await api.get(`${ApiEndpoints.VEHICLES_BY_ID}/${vehicleId}`);
    return response.data.data;
  },

  updateVehicle: async (vehicleId: string, payload: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await api.patch(`${ApiEndpoints.VEHICLE_EDIT}/${vehicleId}/edit`, payload);
    return response.data.data;
  },

  deleteVehicle: async (vehicleId: string): Promise<void> => {
    await api.patch(`${ApiEndpoints.VEHICLE_DELETE}/${vehicleId}/delete`);
  },

  restoreVehicle: async (vehicleId: string): Promise<void> => {
    await api.patch(`${ApiEndpoints.VEHICLE_RESTORE}/${vehicleId}/restore`);
  },
};
