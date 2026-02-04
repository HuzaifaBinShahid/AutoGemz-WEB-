import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/interfaces";
import api from "@/lib/api";
import { setCredentials } from "../slices/authSlice";
import { ApiEndpoints } from "@/enums/endpoints";

// Login thunk
export const loginUser = createAsyncThunk<
  { user: User; token: string; refresh_token: string },
  { email: string; password: string, role?: string },
  { rejectValue: string }
>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(ApiEndpoints.AUTH_LOGIN, { ...credentials  });
      const { user, token } = response.data;
      localStorage.setItem("token", token?.access?.token);
      return { user, token: token?.access?.token, refresh_token: token?.refresh?.token  };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; username: string; phone: string; password: string; fullName: string },
  { rejectValue: string }
>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(ApiEndpoints.AUTH_REGISTER, userData);
      const { user, token } = response.data;

      // Store token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      return { user, token };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    try {
      await api.post(ApiEndpoints.AUTH_LOGOUT);
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout API call failed:", error);
    } finally {
      // Clear token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    }
  }
);

// Fetch current user thunk
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get(ApiEndpoints.AUTH_ME);
      const user = response.data;

      // Get token from localStorage
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (token) {
        dispatch(setCredentials({ user, token }));
      }

      return user;
    } catch (error: any) {
      // If unauthorized, clear token from localStorage
      // The extraReducers will handle clearing the auth state
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// Update user profile thunk
export const updateUserProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch(ApiEndpoints.AUTH_PROFILE, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Fetch user profile settings thunk
export const fetchUserProfile = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ApiEndpoints.USERS_PROFILE);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

// Update user profile settings thunk
export const updateUserProfileSettings = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>(
  "auth/updateUserProfileSettings",
  async (profileData, { rejectWithValue }) => {
    try {
      // If profileData contains File objects, convert them to base64
      const processedData: any = { ...profileData };
      
      // Handle avatar/profilePicture if it's a base64 string (already converted)
      // or if it needs to be sent as-is
      const response = await api.patch(ApiEndpoints.USERS_PROFILE, processedData);
      
      // Return the updated profile data
      return response.data?.data || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user profile"
      );
    }
  }
);

// Forgot password thunk
export const forgotPassword = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: string }
>(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(ApiEndpoints.AUTH_FORGOT_PASSWORD, {
        email: data.email,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send password reset email"
      );
    }
  }
);

