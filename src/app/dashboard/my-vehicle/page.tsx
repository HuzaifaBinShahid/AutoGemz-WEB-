"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import MyVehicle from "@/features/my-vehicle";
import { MyVehicleFilterTabs } from "@/features/my-vehicle/MyVehicleFilterTabs";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function MyVehiclePage() {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );
  const [activeTab, setActiveTab] = useState<"all" | "unsold" | "sold" >("all");

  // API call logic here
  // const { data: stats } = useQuery(['dashboardStats'], fetchDashboardStats);

  return (
    <DashboardLayout headerActions={<MyVehicleFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />}>
      <MyVehicle user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
    </DashboardLayout>
  );
}

