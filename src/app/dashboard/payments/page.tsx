"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_PAYMENTS } from "@/constants/constants";
import Payments from "@/features/payments";

export default function PaymentsPage() {

  const payments = MOCK_PAYMENTS;

  return (
    <DashboardLayout>
      <Payments payments={payments} />
    </DashboardLayout>
  );
}

