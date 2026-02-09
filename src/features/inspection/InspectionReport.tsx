"use client";

import React, { useState } from "react";
import InspectionHeader from "./components/InspectionHeader";
import VehicleInfoSection from "./components/VehicleInfoSection";
import CarSpecificationsSection from "./components/CarSpecificationsSection";
import InspectionSummarySection from "./components/InspectionSummarySection";
import ExteriorConditionSection from "./components/ExteriorConditionSection";
import InspectionCategoriesSection from "./components/InspectionCategoriesSection";
import VehiclePicturesSection from "./components/VehiclePicturesSection";
import CommentsSection from "./components/CommentsSection";
import DisclaimerSection from "./components/DisclaimerSection";
import MobilePrintButtons from "./components/MobilePrintButtons";
import DotIcon from "@/assets/svg/DotIcon";
import DashedLine from "@/assets/svg/DashedLine";

const InspectionReport = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["AC / HEATER", "BRAKES", "ELECTRICAL & ELECTRONICS"])
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="w-full !pb-[64px]  lg:px-[42px] px-[23px] space-y-6 mt-32 relative 2xl:container 2xl:mx-auto">
      <InspectionHeader />

      <VehicleInfoSection />

      <CarSpecificationsSection />

      <InspectionSummarySection />

      <ExteriorConditionSection />

      <InspectionCategoriesSection
        expandedCategories={expandedCategories}
        onToggleCategory={toggleCategory}
      />

      <VehiclePicturesSection
        selectedImageIndex={selectedImageIndex}
        onImageSelect={setSelectedImageIndex}
      />

      <CommentsSection />
<DashedLine/>
      <DisclaimerSection />

      <MobilePrintButtons />
    </div>
  );
};

export default InspectionReport;
