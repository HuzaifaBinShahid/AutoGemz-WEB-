import React, { useState } from "react";
import Image from "next/image";
import { INSPECTION_REPORT_DATA } from "@/constants/constants";
import CarInspectionIcon from "@/assets/svg/CarInspectionIcon";

const ExteriorConditionSection = () => {
  const [showMinorScratches, setShowMinorScratches] = useState(false);
  return (
    <div className="md:p-6 p-[18.63px] bg-white dark:bg-[#111111] !mb-6 md:!mb-[81px]" >
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-[62px] justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[57px] bg-[#DC3729]"></div>
          <h2 className="md:text-[36px] text-xl md:leading-[47px] uppercase text-black dark:text-white font-display font-semibold md:tracking-[1.4px]">
            EXTERIOR CONDITION
          </h2>
        </div>
        <div className="flex items-center gap-2 mt-5 md:mt-0">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showMinorScratches}
              onChange={(e) => setShowMinorScratches(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-customRed dark:peer-focus:ring-customRed rounded-full peer dark:bg-neutral-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-customRed"></div>
          </label>
          <span className="text-sm text-black dark:text-white font-medium">
            Show Minor Scratches / Dents
          </span>
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exterior Image */}
          <div className="order-2 lg:order-1">

            <div className="relative w-full lg:h-[576px] h-[264px] bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
              <Image
                src={
                  INSPECTION_REPORT_DATA.vehiclePictures[0] || "/images/car-1.jpg"
                }
                alt="Exterior"
                fill
                className="object-cover"
              />
              {/* Bottom Badge Overlay */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center h-[70px] bg-white">
                {/* Red vertical strip */}
                <div className="h-full w-1.5 bg-gradient-to-b from-[#DC3729] to-[#E55B3F]"></div>
                {/* Badge and text container */}
                <div
                  className="flex-1 flex items-center h-full pl-2 border-r border-y border-black"
                  style={{
                    background:
                      "linear-gradient(221.12deg, rgba(220, 55, 41, 0.75) 3%, rgba(0, 0, 0, 0.08) 27%, rgba(0, 0, 0, 0.08) 74%, rgba(203, 61, 29, 0.55) 90.59%, rgba(220, 55, 41, 0.5) 100%)",
                  }}
                >
                  {/* Red badge */}
                  <div className="relative border-r pr-6 border-black z-10">
                    <div className="bg-gradient-to-br from-[#DC3729] to-[#E55B3F] rounded-lg px-4 py-2.5 shadow-lg">
                      <span className="text-white font-bold text-xl">W 2</span>
                    </div>
                  </div>
                  {/* Text */}
                  <div className="ml-4">
                    <span className="text-black uppercase font-semibold tracking-wider text-sm md:text-base">
                      CAR ROOF
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:pt-[56px] pt-[30px]">
              <div className="flex flex-col gap-4">
                {/* Damage Labels Grid */}
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: "W2", text: "POLYCATE" },
                    { label: "P", text: "PAINT MARKED" },
                    { label: "D1", text: "SMALL DENT" },
                    { label: "D2", text: "DENT" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-5">
                      <div className="bg-customRed flex items-center justify-center px-1 py-0.5 rounded w-[30px] h-[20px]">
                        <span className="text-white font-semibold text-sm uppercase">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-black dark:text-white font-semibold xl:text-[24px] md:text-lg font-display text-sm uppercase">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Damage Legend */}
          <div className="xl:py-[69px] xl:px-[83px] order-1 lg:order-2">
            <CarInspectionIcon />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ExteriorConditionSection;
