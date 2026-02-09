import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/interfaces";
import api from "@/lib/api";
import { setCredentials } from "../slices/authSlice";

// Login thunk
export const loginUser = createAsyncThunk<
  { user: User; token: string; refresh_token: string },
  { email: string; password: string, role?: string },
  { rejectValue: string }
>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { ...credentials, role: "user" });
      const { user, token } = response.data;
      localStorage.setItem("token", token?.access?.token);
      return { user, token: token?.access?.token, refresh_token: token?.access?.refresh_token  };
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
      const response = await api.post("/auth/register", userData);
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
      await api.post("/auth/logout");
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
      const response = await api.get("/auth/me");
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
      const response = await api.patch("/auth/profile", userData);
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
      const response = await api.get("/users/profile");
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
      // Backend allows only "avatar", not "profilePicture" — omit profilePicture
      const { profilePicture: _omit, ...rest } = profileData || {};
      const processedData: any = { ...rest };

      const response = await api.patch("/users/profile", processedData);
      
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
      const response = await api.post("/auth/forgot-password", {
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

