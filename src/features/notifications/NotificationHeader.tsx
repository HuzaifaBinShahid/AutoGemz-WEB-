"use client";

import React, { useState } from "react";

type FilterType = "all" | "earlier";

export const NotificationFilterTabs = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters = [
    { value: "all" as FilterType, label: "View All" },
    { value: "earlier" as FilterType, label: "Earlier" },
  ];

  return (
    <div className="flex gap-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setActiveFilter(filter.value)}
          className={`pb-3 px-1 text-sm font-semibold  tracking-wide transition-colors ${activeFilter === filter.value
            ? "text-gray-900 dark:text-white border-b-2 border-customRed"
            : "dark:text-[#FFFFFFB2] dark:text-white border-b-2 hover:text-customRed"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

const NotificationHeader = () => {
  return (
    <div className="mb-8">
      {/* Filter Tabs */}
      <div className="flex gap-6 border-b border-neutral-200 dark:border-neutral-800">
        <NotificationFilterTabs />
      </div>
    </div>
  );
};

export default NotificationHeader;

