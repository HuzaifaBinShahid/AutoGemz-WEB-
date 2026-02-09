import React from "react";
import { cn } from "@/lib/utils";
import ImageIcon from "@/assets/svg/ImageIcon";

interface CategoryItem {
  label: string;
  value: string;
  status?: string;
  hasViewButton?: boolean;
}

interface CategoryContentProps {
  categoryName: string;
  items: CategoryItem[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ categoryName, items }) => {
  // Unified design for all categories - Two-column grid with colored boxes and VIEW buttons
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, itemIndex) => {
        const bgColor = item.status === "error"
          ? "bg-[#EFCECB] dark:bg-[#CB3D1D8C]"
          : "bg-[#D9EFCB87] dark:bg-[#29DC9780]";

        return (
          <div key={itemIndex} className={cn("p-3", bgColor)}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs lg:text-base font-bold text-black dark:text-white mb-1 break-words">
                  {item.label}
                </div>
                <div className={cn(
                  "text-xs font-bold",
                  item.status === "error" ? "text-[#0000008C] dark:text-[#FFFFFF99]" : "text-[#0000008C] dark:text-[#FFFFFF99]"
                )}>
                  {item.value}
                </div>
              </div>
              {item.hasViewButton && (
                <button className="bg-customRed text-white h-[24px] hover:text-red-700 flex-shrink-0 ml-2 flex px-1 rounded gap-3 items-center justify-center">
                  <ImageIcon />
                  <span className="text-xs font-semibold uppercase">VIEW</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryContent;

