"use client";

import React from "react";
import type { Notification } from "@/interfaces";
import NotificationList from "./NotificationList";

interface NotificationsProps {
  notifications: Notification[];
}

export default function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="w-full">
      {/* Main Content Layout */}
      <div className="">
        {/* Right Content - Notifications List */}
        <NotificationList notifications={notifications} />
      </div>
    </div>
  );
}

