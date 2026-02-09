"use client";

import React from "react";

type TabType = "all" | "won" | "lost" | "schedule";

interface DashboardFilterTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const DashboardFilterTabs = ({ activeTab, setActiveTab }: DashboardFilterTabsProps) => {
  return (
    <div className="flex gap-6">
      {(["all", "won", "lost", "schedule"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 px-1 text-sm font-semibold uppercase font-display transition-colors ${
            activeTab === tab
              ? "text-gray-900 dark:text-white border-b-2 border-customRed"
              : "text-gray-700 dark:text-white hover:text-customRed"
          }`}
        >
          {tab === "all" ? "All" : tab === "won" ? "Won" : tab === "lost" ? "Lost" : "Schedule Bid"}
        </button>
      ))}
    </div>
  );
};

