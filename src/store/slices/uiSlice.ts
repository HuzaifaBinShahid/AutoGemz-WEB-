import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "@/interfaces";
import { initializeTheme, syncThemeToServer } from "../thunks/uiThunks";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const savedTheme = localStorage.getItem("theme");
  return (savedTheme === "dark" ? "dark" : "light");
};

const initialState: UIState = {
  theme: getInitialTheme(),
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
        if (action.payload === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
  extraReducers: (builder) => {
    // Initialize theme
    builder
      .addCase(initializeTheme.pending, (state) => {
        // Handle loading state if needed
      })
      .addCase(initializeTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(initializeTheme.rejected, (state) => {
        // Handle error state if needed
      });

    // Sync theme to server
    builder
      .addCase(syncThemeToServer.pending, (state) => {
        // Handle loading state if needed
      })
      .addCase(syncThemeToServer.fulfilled, (state) => {
        // Theme already updated by setTheme in the thunk
      })
      .addCase(syncThemeToServer.rejected, (state) => {
        // Handle error state if needed
      });
  },
});

export const { setTheme, toggleTheme, setSidebarOpen, toggleSidebar } =
  uiSlice.actions;
export default uiSlice.reducer;

