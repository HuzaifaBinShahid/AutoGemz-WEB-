import React from "react";
import { INSPECTION_REPORT_DATA } from "@/constants/constants";

const CarSpecificationsSection = () => {
  return (
    <div className="bg-white dark:!bg-[#111111] p-6">
      <div className="flex items-center gap-2 mb-7">
        <div className="w-[3px] h-10 bg-customRed"></div>
        <h4 className="text-xl md:text-[36px] font-semibold text-gray-900 dark:text-white uppercase font-display">
          CAR SPECIFICATION
        </h4>
      </div>

      <div className="bg-white dark:bg-[#111111] overflow-hidden">
        <table className="w-full border-collapse">
          <tbody>
            {Array.from({ length: Math.ceil(INSPECTION_REPORT_DATA.specifications.length / 4) }).map((_, rowIndex) => {
              const startIndex = rowIndex * 4;
              const row = INSPECTION_REPORT_DATA.specifications.slice(startIndex, startIndex + 4);
              return (
                <tr key={rowIndex}>
                  {row.map((spec, colIndex) => (
                    <td
                      key={`${spec.label}-${colIndex}`}
                      className={`px-4 py-3 ${colIndex === 3 ? 'hidden md:table-cell' : ''}`}
                    >
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
                  {/* Fill empty cells if row has less than 4 items */}
                  {row.length < 4 &&
                    Array.from({ length: 4 - row.length }).map((_, emptyIndex) => (
                      <td
                        key={`empty-${rowIndex}-${emptyIndex}`}
                        className={`px-4 py-3 ${emptyIndex === 3 ? 'hidden md:table-cell' : ''}`}
                      ></td>
                    ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarSpecificationsSection;

