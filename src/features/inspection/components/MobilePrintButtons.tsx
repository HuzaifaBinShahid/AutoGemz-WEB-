import React from "react";
import Button from "@/components/common/Button";

const MobilePrintButtons = () => {
  return (
    <div className="items-center gap-3 md:hidden flex">
      <Button
        variant="primary"
        className="bg-customRed hover:bg-red-700 text-white font-semibold uppercase text-sm px-4 py-2"
        onClick={() => window.print()}
      >
        PRINT REPORT
      </Button>
      <Button
        variant="outline"
        className="border-2 border-customRed text-customRed bg-white dark:bg-transparent dark:text-white dark:border-gray-600 font-semibold uppercase text-sm px-4 py-2"
        onClick={() => window.print()}
      >
        PRINT SUMMARY
      </Button>
    </div>
  );
};

export default MobilePrintButtons;

