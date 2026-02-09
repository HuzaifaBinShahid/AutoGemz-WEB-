"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/features/dashboard";
import { DashboardFilterTabs } from "@/features/dashboard/DashboardFilterTabs";

export default function DashboardPage() {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );
  const [activeTab, setActiveTab] = useState<"all" | "won" | "lost" | "schedule">("all");

  // API call logic here
  // const { data: stats } = useQuery(['dashboardStats'], fetchDashboardStats);

  return (
    <DashboardLayout headerActions={<DashboardFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />}>
      <Dashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
    </DashboardLayout>
  );
}

