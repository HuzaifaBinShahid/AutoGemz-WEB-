"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DealerOffersPage() {

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Main Content */}
        <div className="w-full">
          <div className="bg-[#2E2E2E] dark:bg-[#2E2E2E] border border-[#FFFFFF1A] rounded-lg p-8">
            <p className="text-white text-center py-12">
              Dealer Instant Offers content will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

