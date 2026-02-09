import api from "@/lib/api";

export interface GetAuctionsParams {
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface Auction {
  id?: string;
  _id?: string;
  title?: string;
  currentBid?: number;
  startingPrice?: number;
  year?: string;
  mileage?: string;
  images?: string[];
  endTime?: string;
  startTime?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  status?: string;
  vehicles?: any[];
  [key: string]: any;
}

export interface AuctionsResponse {
  message?: string;
  data?: {
    results?: Auction[];
    page?: number;
    limit?: number;
    totalPages?: number;
    totalResults?: number;
  };
}

export const auctionService = {
  getAuctions: async (params: GetAuctionsParams): Promise<AuctionsResponse> => {
    const response = await api.get<AuctionsResponse>("/auctions", {
      params,
    });
    return response.data;
  },

  getAuctionById: async (id: string): Promise<{ data: Auction }> => {
    const response = await api.get<{ data: Auction }>(`/auctions/${id}`);
    return response.data;
  },

  placeBid: async (
    auctionId: string,
    vehicleId: string,
    amount: number,
  ): Promise<any> => {
    const response = await api.post(`/bids/${auctionId}/place-bid`, {
      vehicleId,
      bidAmount: amount,
    });
    return response.data;
  },

  getBids: async (auctionId: string, vehicleId?: string): Promise<any> => {
    const response = await api.get(`/bids/${auctionId}/bids`, {
      params: { vehicleId },
    });
    return response.data;
  },

  getMyBids: async (): Promise<AuctionsResponse> => {
    const response = await api.get<AuctionsResponse>("/auctions/my-bids");
    return response.data;
  },

  participateInAuction: async (auctionId: string): Promise<any> => {
    const response = await api.post(`/auctions/${auctionId}/participate`);
    return response.data;
  },
};
