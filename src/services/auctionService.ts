import api from '@/lib/api';
import { ApiEndpoints } from '@/enums/endpoints';

export interface GetAuctionsParams {
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  isActive: boolean;
  createdBy: {
    fullName: string;
    email: string;
    id: string;
  };
  vehicles: {
    vehicleId: string | any;
    inspectionId: string;
    minimumBidAmount: number;
    bidIncrement: number;
    winnerId: string | null;
    isSold: boolean;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface GetAuctionsResponse {
  results: Auction[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export const auctionService = {
  getAuctions: async (params: GetAuctionsParams = {}): Promise<GetAuctionsResponse> => {
    const { isActive = true, page = 1, limit = 10, sortBy = 'createdAt:desc' } = params;
    const response = await api.get(ApiEndpoints.AUCTIONS, {
      params: { isActive, page, limit, sortBy },
    });
    return response.data.data;
  },

  getAuctionById: async (id: string): Promise<Auction> => {
    const response = await api.get(`${ApiEndpoints.AUCTIONS}/${id}`);
    return response.data.data;
  },

  updateAuction: async (id: string, payload: Partial<Auction>): Promise<void> => {
    await api.patch(`${ApiEndpoints.AUCTIONS}/${id}`, payload);
  },

  selectWinner: async (auctionId: string, vehicleId: string): Promise<void> => {
    const url = ApiEndpoints.SELECT_WINNER
      .replace(':auctionId', auctionId)
      .replace(':vehicleId', vehicleId);
    await api.patch(url);
  },

  endAuction: async (auctionId: string, winnerId?: string): Promise<void> => {
    const url = ApiEndpoints.END_AUCTION.replace(':auctionId', auctionId);
    await api.patch(url, { winnerId });
  },

  registerVehicleAccess: async (auctionId: string, vehicleId: string, paymentAmount: number): Promise<void> => {
    const url = ApiEndpoints.REGISTER_VEHICLE_ACCESS
      .replace(':auctionId', auctionId)
      .replace(':vehicleId', vehicleId);
    await api.post(url, { paymentAmount });
  },

  getVehicleAccessStatus: async (auctionId: string, vehicleId: string): Promise<any> => {
    const url = ApiEndpoints.VEHICLE_ACCESS_STATUS
      .replace(':auctionId', auctionId)
      .replace(':vehicleId', vehicleId);
    const response = await api.get(url);
    return response.data.data;
  },

  addVehicleToAuction: async (auctionId: string, payload: { vehicleId: string; minimumBidAmount: number; bidIncrement: number }): Promise<void> => {
    const url = ApiEndpoints.ADD_VEHICLE_TO_AUCTION.replace(':auctionId', auctionId);
    await api.post(url, payload);
  },

  removeVehicleFromAuction: async (auctionId: string, vehicleId: string): Promise<void> => {
    const url = ApiEndpoints.REMOVE_VEHICLE_FROM_AUCTION
      .replace(':auctionId', auctionId)
      .replace(':vehicleId', vehicleId);
    await api.delete(url);
  },

  createAuction: async (payload: any): Promise<void> => {
    await api.post(ApiEndpoints.AUCTIONS, payload);
  },
};
