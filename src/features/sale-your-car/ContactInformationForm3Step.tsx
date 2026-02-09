"use client";

import React, { useState, useEffect } from "react";
import FormInput from "@/components/common/FormInput";
import Button from "@/components/common/Button";
import MobileIcon from "@/assets/svg/MobileIcon";
import { useVehicleSaleForm } from "./VehicleSaleFormContext";

interface ContactInformationForm3StepProps {
  onSubmit?: () => void;
  isLoading?: boolean;
}

const ContactInformationForm3Step: React.FC<ContactInformationForm3StepProps> = ({ onSubmit, isLoading }) => {
  const { formData, updateContactInfo, resetKey } = useVehicleSaleForm();
  const [localFormData, setLocalFormData] = useState({
    mobileNumber: formData.mobileNumber || "",
    secondaryNumber: formData.secondaryNumber || "",
    allowWhatsApp: formData.allowWhatsApp || false,
  });

  // Sync local state with formData when it changes (for edit mode)
  useEffect(() => {
    setLocalFormData({
      mobileNumber: formData.mobileNumber || "",
      secondaryNumber: formData.secondaryNumber || "",
      allowWhatsApp: formData.allowWhatsApp || false,
    });
  }, [formData.mobileNumber, formData.secondaryNumber, formData.allowWhatsApp]);

  // Reset local state when form is reset (resetKey changes)
  useEffect(() => {
    if (resetKey > 0) {
      const resetData = {
        mobileNumber: "",
        secondaryNumber: "",
        allowWhatsApp: false,
      };
      setLocalFormData(resetData);
    }
  }, [resetKey]);

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...localFormData, [field]: value };
    setLocalFormData(newData);
    updateContactInfo(newData);
  };

  const handleCheckboxChange = (checked: boolean) => {
    const newData = { ...localFormData, allowWhatsApp: checked };
    setLocalFormData(newData);
    updateContactInfo(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#111111] py-10">
        <div className="">
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-12 bg-customRed"></div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-black dark:text-white uppercase tracking-wide">
              CONTACT INFORMATION
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form className="space-y-6">
              {/* Mobile Number */}
              <div className="">
                <div className="flex-1">
                  <FormInput
                    label="Mobile Number"
                    type="tel"
                    required={true}
                    value={localFormData.mobileNumber}
                    onChange={(e) =>
                      handleInputChange("mobileNumber", e.target.value)
                    }
                    placeholder="MOBILE NUMBER"
                    darkMode={true}
                    labelPosition="left"
                  />
                </div>
                <div className="flex mt-3 gap-2 text-customRed pointer-events-none lg:hidden">
                  <div>
                    <MobileIcon />
                  </div>
                  <span className="text-sm text-black dark:text-white w-auto font-medium font-mulish">
                    Enter a genuine 11 digit mobile no. with format 03XXXXXXXXX.
                    All inquires will come on this number.
                  </span>
                </div>
              </div>

              {/* Secondary Number */}
              <FormInput
                label="Secondary Number"
                type="tel"
                value={localFormData.secondaryNumber}
                onChange={(e) =>
                  handleInputChange("secondaryNumber", e.target.value)
                }
                placeholder="SECONDARY NUMBER"
                darkMode={true}
                labelPosition="left"
              />

              {/* WhatsApp Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={localFormData.allowWhatsApp}
                  onChange={(e) => handleCheckboxChange(e.target.checked)}
                  className="h-5 w-5 rounded border-2 border-customRed bg-transparent text-customRed focus:ring-2 focus:ring-customRed focus:ring-offset-0 cursor-pointer checked:bg-customRed"
                />
                <label className="text-sm font-medium text-black dark:text-white tracking-wide font-mulish cursor-pointer">
                  Allow WhatsApp Contact
                </label>
              </div>
            </form>
            <div className="lg:flex justify-center gap-2 text-customRed pointer-events-none hidden">
              <MobileIcon />
              <span className="text-sm text-black dark:text-white max-w-xs font-medium font-mulish">
                Enter a genuine 11 digit mobile no. with format 03XXXXXXXXX. All
                inquires will come on this number.
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div className="pt-6 max-w-6xl mx-auto xl:px-0 px-4 pb-[60px]">
        <Button 
          onClick={handleSubmit}
          variant="default" 
          className="w-full uppercase"
          disabled={isLoading}
        >
          {isLoading ? "SUBMITTING..." : "SUBMIT"}
        </Button>
      </div>
    </section>
  );
};

export default ContactInformationForm3Step;

