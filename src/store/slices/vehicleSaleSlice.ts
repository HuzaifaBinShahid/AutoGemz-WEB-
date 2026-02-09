import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { VehicleSaleState } from "@/interfaces";
import { submitVehicleSale, fetchSellingVehicles, fetchVehicleById, updateVehicle } from "../thunks/vehicleSaleThunks";

const initialState: VehicleSaleState = {
  isLoading: false,
  error: null,
  success: false,
  submittedVehicleId: null,
  sellingVehicles: [],
  sellingVehiclesLoading: false,
  sellingVehiclesError: null,
  pagination: null,
  editingVehicle: null,
  editingVehicleLoading: false,
  editingVehicleError: null,
};

const vehicleSaleSlice = createSlice({
  name: "vehicleSale",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.submittedVehicleId = null;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.submittedVehicleId = null;
    },
    clearSellingVehiclesError: (state) => {
      state.sellingVehiclesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit vehicle sale
      .addCase(submitVehicleSale.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitVehicleSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.submittedVehicleId = action.payload.id;
      })
      .addCase(submitVehicleSale.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload || "Failed to submit vehicle sale";
      })
      // Fetch selling vehicles
      .addCase(fetchSellingVehicles.pending, (state) => {
        state.sellingVehiclesLoading = true;
        state.sellingVehiclesError = null;
      })
      .addCase(fetchSellingVehicles.fulfilled, (state, action) => {
        state.sellingVehiclesLoading = false;
        state.sellingVehicles = action.payload.vehicles;
        state.pagination = action.payload.pagination;
        state.sellingVehiclesError = null;
      })
      .addCase(fetchSellingVehicles.rejected, (state, action) => {
        state.sellingVehiclesLoading = false;
        state.sellingVehiclesError = action.payload || "Failed to fetch selling vehicles";
      })
      // Fetch vehicle by ID
      .addCase(fetchVehicleById.pending, (state) => {
        state.editingVehicleLoading = true;
        state.editingVehicleError = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.editingVehicleLoading = false;
        state.editingVehicle = action.payload;
        state.editingVehicleError = null;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.editingVehicleLoading = false;
        state.editingVehicleError = action.payload || "Failed to fetch vehicle";
      })
      // Update vehicle
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.editingVehicle = null; // Clear editing vehicle after successful update
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload || "Failed to update vehicle";
      });
  },
});

export const { clearError, clearSuccess, resetState, clearSellingVehiclesError } = vehicleSaleSlice.actions;
export default vehicleSaleSlice.reducer;

