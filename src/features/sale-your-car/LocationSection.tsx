"use client";

import React, { useState, useEffect } from "react";
import Dropdown from "@/components/common/Dropdown";
import { useVehicleSaleForm } from "./VehicleSaleFormContext";

const LocationSection: React.FC = () => {
  const { formData, updateLocationInfo, resetKey } = useVehicleSaleForm();
  const [localFormData, setLocalFormData] = useState({
    city: formData.city || "",
    state: formData.state || "",
    requestInspection: formData.requestInspection || false,
  });

  // Sync local state with formData when it changes (for edit mode)
  useEffect(() => {
    setLocalFormData({
      city: formData.city || "",
      state: formData.state || "",
      requestInspection: formData.requestInspection || false,
    });
  }, [formData.city, formData.state, formData.requestInspection]);

  // Reset local state when form is reset (resetKey changes)
  useEffect(() => {
    if (resetKey > 0) {
      const resetData = {
        city: "",
        state: "",
        requestInspection: false,
      };
      setLocalFormData(resetData);
    }
  }, [resetKey]);

  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"];
  const states = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan", "Gilgit-Baltistan"];

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...localFormData, [field]: value };
    setLocalFormData(newData);
    updateLocationInfo(newData);
  };

  const handleCheckboxChange = (checked: boolean) => {
    const newData = { ...localFormData, requestInspection: checked };
    setLocalFormData(newData);
    updateLocationInfo(newData);
  };

  return (
    <section className="w-full pt-12 md:pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#111111] pt-10">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-12 bg-customRed"></div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-black dark:text-white uppercase tracking-wide">
            LOCATION
          </h2>
        </div>

        <div className="space-y-6">
          {/* City */}
          <Dropdown
            label="City"
            value={localFormData.city}
            options={cities}
            onChange={(value) => handleInputChange("city", value)}
            placeholder="ENTER CITY"
            required={true}
          />

          {/* State */}
          <Dropdown
            label="State"
            value={localFormData.state}
            options={states}
            onChange={(value) => handleInputChange("state", value)}
            placeholder="SELECT STATE"
            required={true}
          />

          {/* Inspection Checkbox */}
          <div className="flex items-center gap-3 pt-4">
            <input
              type="checkbox"
              checked={localFormData.requestInspection}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="h-5 w-5 rounded border-2 border-customRed bg-transparent text-customRed focus:ring-2 focus:ring-customRed focus:ring-offset-0 cursor-pointer checked:bg-customRed"
            />
            <label className="text-sm font-medium text-black dark:text-white tracking-wide font-mulish cursor-pointer">
              Request a free inspection
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

