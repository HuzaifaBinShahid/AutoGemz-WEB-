import React from "react";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { INSPECTION_REPORT_DATA } from "@/constants/constants";
import DummyImage from "../../../../public/images/AuthImage.jpg";
import DonutChart from "./DonutChart";
import RatingLegend from "./RatingLegend";

const VehicleInfoSection = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        {/* Left Section - Car Image */}
        <div className="flex-shrink-0 w-full">
          <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[504px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <Image
              src={INSPECTION_REPORT_DATA.vehiclePictures[0] || DummyImage}
              alt={INSPECTION_REPORT_DATA.vehicleModel}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Section - Vehicle Info and Rating */}
        <div className="flex-1 flex flex-col">
          {/* Vehicle Info */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="md:text-3xl text-lg xl:text-4xl font-bold text-gray-900 dark:text-white uppercase font-display">
                  TOYOTA COROLLA<br />
                  <span className="md:text-3xl text-lg xl:text-4xl">HATCHBACK MID-SPEC</span>
                </h2>
              </div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-gray-400 flex-shrink-0">
                <FiMapPin className="w-5 h-5 text-customRed" />
                <span className="text-lg font-display font-semibold">{INSPECTION_REPORT_DATA.location}</span>
              </div>
            </div>
          </div>

          {/* Overall Rating Section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-7">
              <div className="w-[3px] h-10 bg-customRed"></div>
              <h4 className="md:text-xl text-lg xl:text-[36px] font-semibold text-gray-900 dark:text-white uppercase font-display">
                OVERALL RATING
              </h4>
            </div>

            <div className="flex flex-row xl:justify-start justify-center items-center md:gap-6">
              {/* Rating Legend */}
              <RatingLegend />

              {/* Donut Chart */}
              <DonutChart
                rating={INSPECTION_REPORT_DATA.overallRating}
                maxRating={INSPECTION_REPORT_DATA.maxRating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoSection;

