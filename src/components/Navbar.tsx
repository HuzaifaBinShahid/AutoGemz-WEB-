import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ThemeIcon from "./svgs/navbar/ThemeIcon";
import NotificationIcon from "./svgs/navbar/NotificationIcon";
import { logoutUser } from "@/store/thunks/authThunks";
import type { AppDispatch, RootState } from "@/store";

const getPageTitle = (pathname: string): string => {
  if (pathname.startsWith("/inspector/settings")) {
    return "SETTINGS";
  }
  if (pathname === "/inspector/add") {
    return "ADD NEW CAR";
  }
  if (pathname.match(/^\/inspector\/\d+/)) {
    return "INSPECTION LIST > DETAILS";
  }
  if (pathname.startsWith("/inspector")) {
    return "INSPECTION LIST";
  }
  if (pathname.startsWith("/auctions/")) {
    return "AUCTIONS > AUCTIONS DETAILS";
  }
  if (pathname.startsWith("/inspection-report/")) {
    return "INSPECTION REPORT > DETAILS";
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
  if (pathname.startsWith("/my-vehicles/")) {
    return "MY VEHICLES > DETAILS";
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
    "/my-vehicles": "MY VEHICLES",
  };
  return titles[pathname] || "BLANK PAGE";
};

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const pageTitle = getPageTitle(location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    setIsDropdownOpen(false);
  };

  return (
    <div className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <h1
        className="text-[24px] text-gray-900 uppercase"
        style={{
          fontFamily: "'Chakra Petch', sans-serif",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "0.14em",
          verticalAlign: "middle",
        }}
      >
        {pageTitle}
      </h1>

      <div className="flex items-center gap-12 ">
        <button className="py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
          <ThemeIcon />
        </button>

        <button className="relative py-2 px-4 hover:bg-gray-200 rounded-lg transition-colors">
          <NotificationIcon />
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">15</span>
          </span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-autogemz-orange transition-all"
          >
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=random`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <Link 
                to={user?.role === 'inspector' ? "/inspector/settings" : "/settings"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
