"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "@/store";
import { queryClient } from "@/lib/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/slices/uiSlice";
import type { RootState } from "@/store";

function ReduxThemeSync({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme = (savedTheme as "light" | "dark") || systemTheme;

    dispatch(setTheme(initialTheme));
  }, [dispatch]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <ReduxThemeSync>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="toast-container"
              />
            </ReduxThemeSync>
          </NextThemesProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

