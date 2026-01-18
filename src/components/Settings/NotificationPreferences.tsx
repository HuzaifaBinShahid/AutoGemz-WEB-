import { useState } from "react";

interface NotificationOption {
  id: string;
  label: string;
}

const NotificationPreferences = () => {
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    paymentAlerts: true,
    newInspectionRequests: true,
    supportQueriesAssigned: true,
    auctionActivity: true,
    systemAnnouncements: true,
  });

  const notificationOptions: NotificationOption[] = [
    { id: "paymentAlerts", label: "PAYMENT ALERTS" },
    { id: "newInspectionRequests", label: "NEW INSPECTION REQUESTS" },
    { id: "supportQueriesAssigned", label: "SUPPORT QUERIES ASSIGNED" },
    { id: "auctionActivity", label: "AUCTION ACTIVITY" },
    { id: "systemAnnouncements", label: "SYSTEM ANNOUNCEMENTS" },
  ];

  const handleToggle = (id: string) => {
    setNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className="bg-white p-6"
      style={{
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        borderRadius: "0",
      }}
    >
      <h3
        className="text-xl font-semibold text-gray-900 mb-6"
        style={{
          fontFamily: "'Chakra Petch', sans-serif",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "0.14em",
          verticalAlign: "middle",
        }}
      >
        Notification Preferences
      </h3>

      <div className="space-y-4">
        {notificationOptions.map((option) => (
          <div key={option.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications[option.id]}
              onChange={() => handleToggle(option.id)}
              className="w-5 h-5"
              style={{ accentColor: "#DC3729" }}
            />
            <label
              className="text-base leading-6 text-black"
              style={{
                fontFamily: "'Mulish', sans-serif",
                fontWeight: 300,
              }}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferences;
