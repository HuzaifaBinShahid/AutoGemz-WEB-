"use client";

import React from "react";

type TabType = "all" | "unsold" | "sold" ;

interface DashboardFilterTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const MyVehicleFilterTabs = ({ activeTab, setActiveTab }: DashboardFilterTabsProps) => {
  return (
    <div className="flex gap-6">
      {(["all", "unsold", "sold"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 px-1 text-sm font-semibold uppercase font-display transition-colors ${
            activeTab === tab
              ? "text-gray-900 dark:text-white border-b-2 border-customRed"
              : "text-gray-700 dark:text-white hover:text-customRed"
          }`}
        >
          {tab === "all" ? "All" : tab === "unsold" ? "UnSold" : "Sold"}
        </button>
      ))}
    </div>
  );
};

