"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_NOTIFICATIONS } from "@/constants/constants";
import Notifications from "@/features/notifications";
import { NotificationFilterTabs } from "@/features/notifications/NotificationHeader";

export default function NotificationsPage() {

  const notifications = MOCK_NOTIFICATIONS;

  return (
    <DashboardLayout headerActions={<NotificationFilterTabs />}>
      <Notifications notifications={notifications} />
    </DashboardLayout>
  );
}

