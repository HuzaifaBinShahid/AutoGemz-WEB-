import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import vehicleSaleReducer from "./slices/vehicleSaleSlice";

// Persist configuration for auth (persist user session)
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "refresh_token", "isAuthenticated"], // Only persist these fields
};

// Persist configuration for UI (persist theme preference)
const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["theme"], // Only persist theme, not sidebar state
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUIReducer = persistReducer(uiPersistConfig, uiReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    ui: persistedUIReducer,
    vehicleSale: vehicleSaleReducer, // Don't persist vehicle sale form data
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

