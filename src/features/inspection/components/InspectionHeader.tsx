import React from "react";
import Button from "@/components/common/Button";
import GlassmorphismWrapper from "@/components/common/GlassmorphismWrapper";
import QuestionMarkIcon from "@/assets/svg/QuestionMarkIcon";

const InspectionHeader = () => {
  return (
    <GlassmorphismWrapper className="!p-6 bg-transparent dark:!bg-[#111111] mb-[48px]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[3px] h-5 bg-customRed"></div>
            <span className="text-sm text-black dark:text-white uppercase font-display">
              CAR INSPECTION
            </span>
          </div>
          <h1 className="text-4xl pt-6 md:text-[56px] font-semibold text-gray-900 dark:text-white uppercase font-display">
            REPORT
          </h1>
        </div>
        <div className="items-center gap-3 hidden md:flex">
          <QuestionMarkIcon />
          <Button
            variant="primary"
            className="bg-customRed hover:bg-red-700 text-white font-semibold uppercase text-base px-[22.45px] py-[17.5px]"
            onClick={() => window.print()}
          >
            PRINT REPORT
          </Button>
          <Button
            variant="outline"
            className="border-2 border-customRed text-customRed bg-transparent dark:bg-transparent dark:text-white dark:border-gray-600 font-semibold uppercase text-base px-[22.45px] py-[17px]"
            onClick={() => window.print()}
          >
            PRINT SUMMARY
          </Button>
        </div>
      </div>
    </GlassmorphismWrapper>
  );
};

export default InspectionHeader;

