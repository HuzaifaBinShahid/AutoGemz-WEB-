"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import DigitalDisplayIcon from "@/assets/svg/DigitalDisplayIcon";
import BluetoothIcon from "@/assets/svg/BluetoothIcon";
import ReversingCamera from "@/assets/svg/ReversingCamera";
import NavigationIcon from "@/assets/svg/NavigationIcon";
import CruiseControlIcon from "@/assets/svg/CruiseControlIcon";
import PetrolPumpIcon from "@/assets/svg/PetrolPumpIcon";
import ParkingSensorIcon from "@/assets/svg/ParkingSensorIcon";
import { FEATURE_ICON_MAPPING } from "@/constants/constants";
import type { CarInspection, CarDetail, CarFeature } from "@/constants/constants";

interface CarDetailsSectionProps {
  inspection: CarInspection;
  basicDetails: CarDetail[];
  specifications: CarDetail[];
  ownershipInfo: CarDetail[];
  features: CarFeature[];
}

const CarDetailsSection: React.FC<CarDetailsSectionProps> = ({
  inspection,
  basicDetails,
  specifications,
  ownershipInfo,
  features,
}) => {
  const router = useRouter();

  // Helper function to chunk array into groups of 3
  const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const basicDetailsRows = chunkArray(basicDetails, 3);
  const specificationsRows = chunkArray(specifications, 3);
  const ownershipInfoRows = chunkArray(ownershipInfo, 3);

  // Icon component mapping
  const iconComponents: Record<string, React.ReactNode> = {
    parkingSensor: <ParkingSensorIcon />,
    cruiseControl: <CruiseControlIcon />,
    reversingCamera: <ReversingCamera />,
    digitalDisplay: <DigitalDisplayIcon />,
    navigation: <NavigationIcon />,
    bluetooth: <BluetoothIcon />,
    petrol: <PetrolPumpIcon />,
  };

  // Function to get the appropriate icon component
  const getFeatureIcon = (featureName: string) => {
    const matched = FEATURE_ICON_MAPPING.find(
      (item) => item.title.toLowerCase() === featureName.toLowerCase()
    );
    if (matched && iconComponents[matched.iconKey]) {
      return iconComponents[matched.iconKey];
    }
    return <Icon name={featureName} size={32} className="text-customRed" />;
  };

  return (
    <>
      {/* Car Details Section */}
      <div className="grid grid-cols-1 pt-[60px] gap-8 mb-12">
        {/* Car Inspection */}
        <div className="p-6 bg-white dark:bg-[#111111]">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-[57px] bg-[#DC3729]"></div>
            <h2 className="md:text-[36px] text-xl leading-[47px] uppercase text-black dark:text-white font-display font-semibold tracking-[1.4px]">
              CAR INSPECTION
            </h2>
          </div>
          <div className="mb-6 flex items-center justify-between ml-3">
            <span className="text-sm leading-[21px] uppercase tracking-[1.4px] text-[#0000008C] dark:text-[#FFFFFF8C] font-display font-semibold">
              OVERALL RATING
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-normal text-black dark:text-white font-display">
                {inspection.overallRating}
              </span>
              <span className="text-sm font-normal text-black dark:text-white font-display">/  10</span>
            </div>
          </div>
          <div className="space-y-4">
            {inspection.categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-[18px]">
                  <span className="text-sm leading-[21px] uppercase text-black dark:text-white font-display font-semibold tracking-[1.4px]">
                    {category.name}
                  </span>
                  <span className="text-lg leading-[21.6px] uppercase text-black dark:text-white font-display font-light tracking-normal">
                    {category.percentage}%
                  </span>
                </div>
                <div className="w-full mb-[30px] h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-customRed rounded-full transition-all"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => router.push('/inspection')}
          className=" max-w-[135px] py-[17.5px] px-6 mx-auto bg-white hover:bg-customRed hover:text-white text-customRed font-semibold font-display uppercase text-sm transition-colors"
          style={{
            border: '1px solid',
            borderImageSource: 'linear-gradient(221.12deg, rgba(220, 55, 41, 0.75) 3%, rgba(0, 0, 0, 0.08) 27%, rgba(0, 0, 0, 0.08) 74%, rgba(203, 61, 29, 0.55) 90.59%, rgba(220, 55, 41, 0.5) 100%)',
            borderImageSlice: 1
          }}
        >
          View More
        </button>
        {/* Basic Car Details */}
        <div className="p-6 bg-white dark:bg-[#111111]">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-[3px] h-[57px] bg-[#DC3729]"></div>
            <h2 className="md:text-[36px] text-xl leading-[47px] uppercase text-black dark:text-white font-display font-semibold tracking-[1.4px]">
              BASIC CAR DETAILS
            </h2>
          </div>
          <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111111] overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                {basicDetailsRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-300 dark:border-gray-700 last:border-b-0"
                  >
                    {row.map((detail, colIndex) => (
                      <td
                        key={detail.label}
                        className={`px-4 py-3 border-r border-gray-300 dark:border-gray-700 ${colIndex === row.length - 1 ? "border-r-0" : ""
                          }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-[#0000008C] dark:text-[#FFFFFF8C] mb-1">
                            {detail.label}
                          </span>
                          <span className="md:text-lg text-sm font-semibold text-black font-display dark:text-white">
                            {detail.value}
                          </span>
                        </div>
                      </td>
                    ))}
                    {/* Fill empty cells if row has less than 3 items */}
                    {row.length < 3 &&
                      Array.from({ length: 3 - row.length }).map((_, emptyIndex) => (
                        <td
                          key={`empty-${emptyIndex}`}
                          className={`px-4 py-3 ${emptyIndex < 3 - row.length - 1
                              ? "border-r border-gray-300 dark:border-gray-700"
                              : ""
                            }`}
                        ></td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Car Specification and Ownership */}
      <div className="grid grid-cols-1 gap-8 mb-12">
        {/* Car Specification */}
        <div className="p-6 bg-white dark:bg-[#111111]">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-[3px] h-[57px] bg-[#DC3729]"></div>
            <h2 className="md:text-[36px] text-xl leading-[47px] uppercase text-black dark:text-white font-display font-semibold tracking-[1.4px]">
              CAR SPECIFICATION
            </h2>
          </div>
          <div className="bg-white dark:bg-[#111111] overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                {specificationsRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((spec, colIndex) => (
                      <td key={spec.label} className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-[#0000008C] dark:text-[#FFFFFF8C] mb-1">
                            {spec.label}
                          </span>
                          <span className="md:text-lg text-sm font-semibold text-black font-display dark:text-white">
                            {spec.value}
                          </span>
                        </div>
                      </td>
                    ))}
                    {/* Fill empty cells if row has less than 3 items */}
                    {row.length < 3 &&
                      Array.from({ length: 3 - row.length }).map((_, emptyIndex) => (
                        <td key={`empty-${emptyIndex}`} className="px-4 py-3"></td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ownership Information */}
        <div className="p-6 bg-white dark:bg-[#111111]">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-[3px] h-[57px] bg-[#DC3729]"></div>
            <h2 className="md:text-[36px] text-xl leading-[47px] uppercase text-black dark:text-white font-display font-semibold tracking-[1.4px]">
              OWNERSHIP INFORMATION
            </h2>
          </div>
          <div className="bg-white dark:bg-[#111111] overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                {ownershipInfoRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((info, colIndex) => (
                      <td key={info.label} className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-[#0000008C] dark:text-[#FFFFFF8C] mb-1">
                            {info.label}
                          </span>
                          <span className="md:text-lg text-sm font-semibold text-black font-display dark:text-white">
                            {info.value}
                          </span>
                        </div>
                      </td>
                    ))}
                    {/* Fill empty cells if row has less than 3 items */}
                    {row.length < 3 &&
                      Array.from({ length: 3 - row.length }).map((_, emptyIndex) => (
                        <td key={`empty-${emptyIndex}`} className="px-4 py-3"></td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Specified Features */}
      <div className="p-6 bg-white dark:bg-[#111111] mb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-[3px] h-[57px] bg-[#DC3729]"></div>
          <h2 className="md:text-[36px] text-xl leading-[47px] uppercase text-black dark:text-white font-display font-semibold tracking-[1.4px]">
            SPECIFIED FEATURES
          </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4"
            >
              <div className="mb-2">
                {getFeatureIcon(feature.name)}
              </div>
              <span className="text-xs text-center text-black dark:text-white">{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarDetailsSection;

