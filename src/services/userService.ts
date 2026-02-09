import api from '@/lib/api';
import { ApiEndpoints } from '@/enums/endpoints';
import type { User } from '@/interfaces';

export interface GetUsersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  role?: string;
}

export interface GetUsersResponse {
  results: User[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export const userService = {
  getUsers: async (params: GetUsersParams = {}): Promise<GetUsersResponse> => {
    const { page = 1, limit = 10, sortBy = 'createdAt:desc', role } = params;
    const response = await api.get(ApiEndpoints.USERS, {
      params: { page, limit, sortBy, role },
    });
    return response.data.data;
  },

  getUserById: async (userId: string): Promise<User> => {
    const response = await api.get(`${ApiEndpoints.USERS_BY_ID}/${userId}`);
    return response.data.data;
  },

  updateUser: async (userId: string, payload: Partial<User>): Promise<User> => {
    const response = await api.patch(`${ApiEndpoints.UPDATE_USER}/${userId}`, payload);
    return response.data.data;
  },

  blacklistUser: async (userId: string): Promise<User> => {
    const response = await api.patch(`${ApiEndpoints.BLACKLIST}/${userId}/blacklist`);
    return response.data.data;
  },

  restoreUser: async (userId: string): Promise<User> => {
    const response = await api.patch(`${ApiEndpoints.RESTORE}/${userId}/restore`);
    return response.data.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get(ApiEndpoints.USERS_PROFILE);
    return response.data.data;
  },

  updateProfile: async (payload: Partial<User>): Promise<User> => {
    const response = await api.patch(ApiEndpoints.USERS_PROFILE, payload);
    return response.data.data;
  },
};
