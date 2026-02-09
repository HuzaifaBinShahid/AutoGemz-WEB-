import React from "react";
import { Notification } from "@/interfaces";
import NotificationIcon from "@/assets/svg/NotificationIcon";

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex-1 bg-white dark:bg-[#111111] p-6">
      <div className="space-y-0">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 px-4 py-6 border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors ${index === notifications.length - 1 ? "border-b-0" : ""
              }`}
          >
            {/* Icon - Red square with M */}
            <div className="flex-shrink-0 w-10 h-10 bg-red-600 dark:bg-red-700 flex items-center justify-center">
              <NotificationIcon />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-base text-black dark:text-white leading-relaxed">
                {notification.message || notification.title}
              </p>
              {/* Timestamp */}
              {/* <div className="flex-shrink-0 text-right">
                <span className="text-sm dark:text-[#FFFFFF4D] dark:text-black whitespace-nowrap">
                  {formatTime(notification.date)}
                </span>
              </div> */}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;

