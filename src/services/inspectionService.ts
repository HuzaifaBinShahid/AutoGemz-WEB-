import api from '@/lib/api';
import { ApiEndpoints } from '@/enums/endpoints';

export interface GetInspectorVehiclesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface InspectorVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  status: string;
  location?: string;
  inspectorName?: string;
  scheduledOn?: string;
  completedOn?: string;
  inspectionId?: string;
  images?: string[];
  city?: string;
  rating?: number;
  mileage?: number;
  transmission?: string;
  description?: string;
}

export interface GetInspectorVehiclesResponse {
  results: InspectorVehicle[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface CreateInspectionPayload {
  basicInformation: {
    model: string;
    city: string;
    images: string[];
  };
  carSpecification: {
    inspectionDate: string;
    engineType: string;
    mileage: number;
    engineNumber: string;
    registrationNumber: string;
    cngInstall: boolean;
    engineCapacity: string;
    chassisNumber: string;
    transmissionType: string;
    registeredCity: string;
    driveType: string;
    registeredYear: number;
  };
  exteriorCondition: {
    images: string[];
    name: string;
    markArea: string;
    selectIssue: string;
  }[];
  acHeater: {
    acFitted: boolean;
    heating: boolean;
    cooling: boolean;
    blower: boolean;
    acOptional: string;
  };
  brake: {
    frontRightDisc: string;
    frontRightDiscImage: string;
    frontLeftDisc: string;
    frontLeftDiscImage: string;
    frontRightBrakePad: string;
    frontRightBrakePadImage: string;
    frontLeftBrakePad: string;
    frontLeftBrakePadImage: string;
  };
  electricalElectronics: {
    computerCheckup: boolean;
    rearViewCamera: boolean;
    batteringWarningLight: boolean;
    oilPressureLowWarningLight: boolean;
    temperatureWarningLight: boolean;
    gauges: boolean;
    airBagWarningLight: boolean;
    powerSteeringWarningLight: boolean;
    absWarningLight: boolean;
    keyFobBatteryLowLight: boolean;
    voltage: string;
    terminalCondition: string;
    charging: boolean;
    alternatorOperation: boolean;
  };
  status: string;
}

export interface InspectionReportResponse {
  vehicle: InspectorVehicle & {
    userId: {
      fullName: string;
      email: string;
      phone: string;
      id: string;
    };
    inspectorId?: {
      fullName: string;
      email: string;
      phone: string;
      id: string;
    };
    adStatus: string;
    vehicleStatus: string;
    type: string;
  };
  inspection: CreateInspectionPayload & {
    id: string;
    vehicleId: string;
    userId: string;
  };
}

export const inspectionService = {
  getInspectorVehicles: async (params: GetInspectorVehiclesParams = {}): Promise<GetInspectorVehiclesResponse> => {
    const { page = 1, limit = 10, sortBy = 'createdAt:desc' } = params;
    const response = await api.get(ApiEndpoints.INSPECTION_VEHICLES, {
      params: { page, limit, sortBy },
    });
    return response.data.data;
  },
  getInspectionVehicleById: async (vehicleId: string): Promise<InspectionReportResponse> => {
    const response = await api.get(`${ApiEndpoints.INSPECTION_VEHICLE_BY_ID}/${vehicleId}`);
    return response.data.data;
  },
  assignInspector: async (vehicleId: string, inspectorId: string): Promise<void> => {
    await api.post(`${ApiEndpoints.ASSIGN_INSPECTOR}/${vehicleId}`, { inspectorId });
  },
  createInspectionSheet: async (payload: CreateInspectionPayload, vehicleId?: string): Promise<void> => {
    const url = vehicleId && vehicleId !== "new" 
      ? `${ApiEndpoints.INSPECTION_VEHICLES}/${vehicleId}` 
      : ApiEndpoints.INSPECTION_VEHICLES;
    await api.post(url, payload);
  },
  updateInspectionSheet: async (vehicleId: string, payload: Partial<CreateInspectionPayload>): Promise<void> => {
    await api.patch(`${ApiEndpoints.UPDATE_INSPECTION}/${vehicleId}`, payload);
  },
};
