"use client";

import { MOCK_PAYMENTS } from "@/constants/constants";
import Payments from "@/features/payments";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function PaymentsPage() {
  // API call logic here
  // const { data: payments } = useQuery(['payments'], fetchPayments);
  const payments = MOCK_PAYMENTS;

  return (
    <ProtectedRoute>
      <Payments payments={payments} />
    </ProtectedRoute>
  );
}

