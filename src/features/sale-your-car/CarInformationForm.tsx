"use client";

import React, { useState, useEffect } from "react";
import Dropdown from "@/components/common/Dropdown";
import { BsFillLightbulbFill } from "react-icons/bs";
import FormInput from "../../components/common/FormInput";
import BulbIcon from "../../assets/svg/BulbIcon";
import { useVehicleSaleForm } from "./VehicleSaleFormContext";
import { years } from "./CarInformationForm3Step";

const CarInformationForm: React.FC = () => {
    const { formData, updateCarInfo, resetKey } = useVehicleSaleForm();
    const [localFormData, setLocalFormData] = useState({
        make: formData.make || "",
        model: formData.model || "",
        year: formData.year || "",
        vin: formData.vin || "",
        transmission: formData.transmission || "",
        registrationCity: formData.registrationCity || "",
        mileage: formData.mileage || "",
        description: formData.description || "",
    });

    const [charCount, setCharCount] = useState(1000 - (formData.description?.length || 0));

    // Sync local state with formData when it changes (for edit mode)
    useEffect(() => {
        setLocalFormData({
            make: formData.make || "",
            model: formData.model || "",
            year: formData.year || "",
            vin: formData.vin || "",
            transmission: formData.transmission || "",
            registrationCity: formData.registrationCity || "",
            mileage: formData.mileage || "",
            description: formData.description || "",
        });
        setCharCount(1000 - (formData.description?.length || 0));
    }, [formData.make, formData.model, formData.year, formData.vin, formData.transmission, formData.registrationCity, formData.mileage, formData.description]);

    // Reset local state when form is reset (resetKey changes)
    useEffect(() => {
        if (resetKey > 0) {
            const resetData = {
                make: "",
                model: "",
                year: "",
                vin: "",
                transmission: "",
                registrationCity: "",
                mileage: "",
                description: "",
            };
            setLocalFormData(resetData);
            setCharCount(1000);
        }
    }, [resetKey]);

    const models = ["Model 1", "Model 2", "Model 3", "Model 4"];
    const transmissions = ["Automatic", "Manual", "CVT"];
    const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi"];

    const handleInputChange = (field: string, value: string) => {
        const newData = { ...localFormData, [field]: value };
        setLocalFormData(newData);
        updateCarInfo(newData);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = e.target.value;
        const newData = { ...localFormData, description: value };
        setLocalFormData(newData);
        updateCarInfo(newData);
        setCharCount(1000 - value.length);
    };

    const handleReset = () => {
        const resetData = {
            make: "",
            model: "",
            year: "",
            vin: "",
            transmission: "",
            registrationCity: "",
            mileage: "",
            description: "",
        };
        setLocalFormData(resetData);
        updateCarInfo(resetData);
        setCharCount(1000);
    };

    return (
        <section className="w-full pt-12 md:pt-16 pb-6 ">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#111111] pt-10">
                {/* Section Title */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-12 bg-customRed"></div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-black dark:text-white uppercase tracking-wide">
                        CAR INFORMATION
                    </h2>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 ml-4">
                    All fields marked with * are mandatory
                </p>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-[82px]">
                    <div className="w-full lg:w-[60%] flex-shrink-0">
                        <form className="space-y-6">
                            {/* Make */}
                            <FormInput
                                label="Make"
                                type="text"
                                value={localFormData.make}
                                onChange={(e) => handleInputChange("make", e.target.value)}
                                placeholder="MAKE"
                                darkMode={true}
                                labelPosition="left"
                                required={true}
                            />
                            <div className="flex items-center gap-2 text-customRed !mt-1 lg:hidden ">
                                <BulbIcon />
                                <span className="text-[10px] font-medium text-black dark:text-white">
                                    We dont allow duplicates of same ad.
                                </span>
                            </div>
                            {/* Model */}
                            <FormInput
                                label="Model"
                                type="text"
                                value={localFormData.model}
                                onChange={(e) => handleInputChange("model", e.target.value)}
                                placeholder="Model"
                                darkMode={true}
                                labelPosition="left"
                                required={true}
                            />
                            <FormInput
                                label="VIN"
                                type="text"
                                value={localFormData.vin}
                                onChange={(e) => handleInputChange("vin", e.target.value)}
                                placeholder="Vehicle Identification Number (VIN)"
                                darkMode={true}
                                labelPosition="left"
                                required={true}
                            />
                            {/* <Dropdown
                                label="Model"
                                value={localFormData.model}
                                options={models}
                                onChange={(value) => handleInputChange("model", value)}
                                placeholder="SELECT MODEL"
                                required={true}
                            /> */}

                            {/* Year */}
                            <Dropdown
                                label="Year"
                                value={localFormData.year}
                                options={years}
                                onChange={(value) => handleInputChange("year", value)}
                                placeholder="YEAR"
                                required={true}
                            />
                            {/* <FormInput
                                label="Year"
                                type="text"
                                value={localFormData.year}
                                onChange={(e) => handleInputChange("year", e.target.value)}
                                placeholder="YEAR"
                                darkMode={true}
                                labelPosition="left"
                                required={true}

                            /> */}

                            {/* Transmission */}
                            <Dropdown
                                label="Transmission"
                                value={localFormData.transmission}
                                options={transmissions}
                                onChange={(value) => handleInputChange("transmission", value)}
                                placeholder="SELECT TRANSMISSION"
                                required={true}
                            />

                            {/* Registration City */}
                            <Dropdown
                                label="Registration City"
                                value={localFormData.registrationCity}
                                options={cities}
                                onChange={(value) =>
                                    handleInputChange("registrationCity", value)
                                }
                                placeholder="REGISTRATION CITY"
                                required={true}
                            />

                            {/* Mileage */}
                            <FormInput
                                label="Mileage (km)"
                                type="text"
                                value={localFormData.mileage}
                                onChange={(e) => handleInputChange("mileage", e.target.value)}
                                placeholder="MILEAGE"
                                darkMode={true}
                                required={true}
                                labelPosition="left"
                            />
                        </form>
                    </div>
                    <div className="w-full xl:w-[40%] lg:w-[30%] lg:flex flex-col gap-2 justify-between hidden ">
                        <div className="flex items-center gap-2 text-customRed  pt-8">
                            <BulbIcon />
                            <span className="text-sm font-medium text-black dark:text-white">
                                We dont allow duplicates of same ad.
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-customRed  pt-8  ">
                            <BulbIcon />
                            <span className="text-sm font-medium text-black dark:text-white  ">
                                We dont allow promotional messages that are not relevant to the
                                ad.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ad Description - Full Width */}
            <div className="bg-white dark:bg-[#111111] pb-8 xl:max-w-6xl xl:mx-auto ">
            <div className=" pt-6 ml-1 px-4 sm:px-6 lg:px-8  ">
                <div className="flex flex-col lg:flex-row items-start  gap-2">
                    <label className="text-xs sm:text-sm font-medium text-[#0000008C] dark:text-white w-full  lg:max-w-[140px] lg:text-right uppercase tracking-wide font-display flex-shrink-0">
                        Ad Description
                        <span className="text-red-500 ml-1 text-2xl">*</span>
                    </label>
                    <div className="flex-1 w-full relative min-w-0">
                        <textarea
                            value={localFormData.description}
                            onChange={handleDescriptionChange}
                            placeholder="Describe Your car: Example: Alloy rim, first owner, genuine parts, maintained by authorized workshop, excellent mileage, original paint etc."
                            className="w-full bg-[#0000000D] dark:bg-[#FFFFFF0D] border-2 border-gray-300 dark:border-[#FFFFFF1A] px-5 py-[18px] text-[#0000008C] dark:text-white placeholder-gray-400 dark:placeholder-[#FFFFFFB2] text-base font-mulish placeholder:font-mulish placeholder:tracking-widest focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition min-h-[120px] resize-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                            rows={5}
                        />
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                Remaining Characters {charCount}
                            </span>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="text-xs text-customRed hover:text-customRed/80 underline"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" items-center gap-2 text-customRed pt-4  max-w-2xl lg:hidden flex md:px-6 px-4">
                <BulbIcon />
                <span className="text-[10px] font-medium text-black dark:text-white  ">
                    We dont allow promotional messages that are not relevant to the
                    ad.
                </span>
            </div>

            </div>
        </section>
    );
};

export default CarInformationForm;
