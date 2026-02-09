import React from "react";
import { INSPECTION_REPORT_DATA } from "@/constants/constants";
import InspectionCategoryAccordion from "./InspectionCategoryAccordion";

interface InspectionCategoriesSectionProps {
  expandedCategories: Set<string>;
  onToggleCategory: (categoryName: string) => void;
}

const InspectionCategoriesSection: React.FC<InspectionCategoriesSectionProps> = ({
  expandedCategories,
  onToggleCategory,
}) => {
  const leftColumnCategories = INSPECTION_REPORT_DATA.categories.filter((_, index) => index % 2 === 0);
  const rightColumnCategories = INSPECTION_REPORT_DATA.categories.filter((_, index) => index % 2 === 1);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {leftColumnCategories.map((category) => (
            <InspectionCategoryAccordion
              key={category.name}
              category={category}
              isExpanded={expandedCategories.has(category.name)}
              onToggle={() => onToggleCategory(category.name)}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-4">
          {rightColumnCategories.map((category) => (
            <InspectionCategoryAccordion
              key={category.name}
              category={category}
              isExpanded={expandedCategories.has(category.name)}
              onToggle={() => onToggleCategory(category.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspectionCategoriesSection;

