import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTheme } from "../slices/uiSlice";

// Initialize theme from localStorage/server
export const initializeTheme = createAsyncThunk<
  "light" | "dark",
  void,
  { rejectValue: string }
>(
  "ui/initializeTheme",
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window === "undefined") {
        return "light";
      }

      const savedTheme = localStorage.getItem("theme");
      const theme = (savedTheme === "dark" ? "dark" : "light") as "light" | "dark";

      // Apply theme to document
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return theme;
    } catch (error) {
      return rejectWithValue("Failed to initialize theme");
    }
  }
);

// Sync theme to server (if needed)
export const syncThemeToServer = createAsyncThunk<
  void,
  "light" | "dark",
  { rejectValue: string }
>(
  "ui/syncTheme",
  async (theme, { rejectWithValue, dispatch }) => {
    try {
      // Update local state
      dispatch(setTheme(theme));

      // Optionally sync to server
      // await api.patch("/user/preferences", { theme });
    } catch (error) {
      return rejectWithValue("Failed to sync theme");
    }
  }
);

