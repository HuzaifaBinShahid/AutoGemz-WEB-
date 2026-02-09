"use client";

import { MOCK_NOTIFICATIONS } from "@/constants/constants";
import Notifications from "@/features/notifications";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function NotificationsPage() {
  // API call logic here
  // const { data: notifications } = useQuery(['notifications'], fetchNotifications);
  const notifications = MOCK_NOTIFICATIONS;

  return (
    <ProtectedRoute>
      <Notifications notifications={notifications} />
    </ProtectedRoute>
  );
}

