import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "@/interfaces";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchCurrentUser,
  updateUserProfile,
  fetchUserProfile,
  updateUserProfileSettings,
} from "../thunks/authThunks";

const initialState: AuthState = {
  user: null,
  token: null,
  refresh_token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("token")
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, () => {
        // Handle loading state if needed
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refresh_token = action.payload.refresh_token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, () => {
        // Handle error state if needed
      });

    // Register
    builder
      .addCase(registerUser.pending, () => {
        // Handle loading state if needed
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, () => {
        // Handle error state if needed
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });

    // Fetch current user
    builder
      .addCase(fetchCurrentUser.pending, () => {
        // Handle loading state if needed
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Update user profile
    builder
      .addCase(updateUserProfile.pending, () => {
        // Handle loading state if needed
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, () => {
        // Handle error state if needed
      });

    // Fetch user profile settings
    builder
      .addCase(fetchUserProfile.pending, () => {
        // Handle loading state if needed
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        // Update user with profile data if available
        if (action.payload && state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(fetchUserProfile.rejected, () => {
        // Handle error state if needed
      });

    // Update user profile settings
    builder
      .addCase(updateUserProfileSettings.pending, () => {
        // Handle loading state if needed
      })
      .addCase(updateUserProfileSettings.fulfilled, (state, action) => {
        // Update user with new profile data
        if (action.payload && state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateUserProfileSettings.rejected, () => {
        // Handle error state if needed
      });
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

