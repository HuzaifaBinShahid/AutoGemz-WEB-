"use client";
import React from "react";
import SettingsForm from "./SettingsForm";

const Settings: React.FC = () => {
  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">


        {/* Right Content - Settings Form */}
        <div className="flex-1">
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-[#FFFFFF1A] rounded-lg p-6 md:p-8">
            <SettingsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

