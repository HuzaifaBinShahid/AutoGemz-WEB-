import { useLocation } from "react-router-dom";
import ThemeIcon from "./svgs/navbar/ThemeIcon";
import NotificationIcon from "./svgs/navbar/NotificationIcon";

const getPageTitle = (pathname: string): string => {
  if (pathname.startsWith("/auctions/")) {
    return "AUCTIONS > AUCTIONS DETAILS";
  }
  if (pathname.startsWith("/users-dealers/")) {
    return "USERS & DEALERS > DETAILS";
  }
  if (pathname.startsWith("/payments-refunds/")) {
    return "PAYMENTS & REFUNDS > DETAILS";
  }
  if (pathname.startsWith("/instant-offer/")) {
    return "INSTANT OFFER > DETAILS";
  }
  const titles: Record<string, string> = {
    "/dashboard": "DASHBOARD",
    "/auctions": "AUCTIONS",
    "/users-dealers": "USERS & DEALERS",
    "/payments-refunds": "PAYMENTS & REFUNDS",
    "/instant-offer": "INSTANT OFFER",
    "/inspection-report": "INSPECTION REPORT",
    "/disputes-center": "DISPUTES CENTER",
    "/settings": "SETTINGS",
  };
  return titles[pathname] || "BLANK PAGE";
};

const Navbar = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-[24px] font-normal text-gray-900">{pageTitle}</h1>

      <div className="flex items-center gap-4">
        <button className="py-2 rounded-lg hover:bg-gray-200 transition-colors">
          <ThemeIcon />
        </button>

        <button className="relative py-2 hover:bg-gray-200 rounded-lg transition-colors">
          <NotificationIcon />
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">15</span>
          </span>
        </button>

        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img
            src="https://ui-avatars.com/api/?name=User&background=random"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
