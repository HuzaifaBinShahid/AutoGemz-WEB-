import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CategoryContent from "./CategoryContent";
import { getSubLabel } from "../utils/utils";

interface CategoryItem {
  label: string;
  value: string;
  status?: string;
  hasViewButton?: boolean;
}

interface Category {
  name: string;
  percentage: number;
  items: CategoryItem[];
}

interface InspectionCategoryAccordionProps {
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
}

const InspectionCategoryAccordion: React.FC<InspectionCategoryAccordionProps> = ({
  category,
  isExpanded,
  onToggle,
}) => {
  const subLabel = getSubLabel(category.name);

  return (
    <div className="bg-white dark:bg-[#111111] lg:p-6 p-3">
      <button onClick={onToggle} className="w-full text-left">
        <div className="flex items-start gap-3">
          {/* Red vertical accent line - spans title and sub-label height */}
          <div className="w-[3px] bg-customRed flex-shrink-0 h-[60px]"></div>

          {/* Content area */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg xl:text-[36px] md:text-[20px] font-bold text-black dark:text-white uppercase font-display mb-2 lg:leading-[47px]">
                  {category.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="md:text-sm text-xs text-black font-semibold dark:text-white uppercase font-display">
                    {subLabel}
                  </span>
                  <span className="text-sm font-bold text-customRed">
                    {category.percentage}%
                  </span>
                </div>
              </div>
              {/* Chevron icon aligned with title */}
              <div className="pt-1">
                {isExpanded ? (
                  <FiChevronUp className="w-5 h-5 text-customRed flex-shrink-0" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-customRed flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4">
          <CategoryContent categoryName={category.name} items={category.items} />
        </div>
      )}
    </div>
  );
};

export default InspectionCategoryAccordion;

