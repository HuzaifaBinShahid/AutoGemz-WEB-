"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import FilterSliderIcon from "@/assets/svg/FilterSliderIcon";

interface DashboardLayoutProps {
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

interface SidebarLink {
  label: string;
  href: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "My Auction Cars", href: "/dashboard" },
  { label: "My Vehicle", href: "/dashboard/my-vehicle" },
  { label: "Notification", href: "/dashboard/notifications" },
  { label: "Payments & Receipts", href: "/dashboard/payments" },
  { label: "Dealer Instant Offers", href: "/dashboard/dealer-offers" },
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Help", href: "/dashboard/help" },
];

export default function DashboardLayout({ children, headerActions }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Find the current active link to get the label
  const activeLink = sidebarLinks.find((link) => {
    if (link.href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(link.href);
  });

  const currentPageTitle = activeLink?.label || "Dashboard";
  const currentPageBreadcrumb = activeLink?.label || "Dashboard";

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen  md:mt-[120px] mt-[70px]">
      <div className="2xl:container 2xlmx-auto px-4 py-8 xl:px-10">
        <div className="  mb-8">
          <div className="px-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase font-display mb-[40px]">
              {currentPageTitle.toUpperCase()}
            </h1>
            {/* Breadcrumbs and Header Actions */}
            <div className="flex md:items-center flex-col md:flex-row md:gap-24 gap-4 mb-6">
              <nav className="flex items-center space-x-2 text-sm font-medium font-mulish">
                {[
                  { label: "Home", href: "/" },
                  { label: "Account", href: "/dashboard" },
                  { label: currentPageBreadcrumb, href: null, isActive: true },
                ].map((item, index, array) => (
                  <React.Fragment key={index}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-black dark:text-white hover:text-customRed transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-customRed dark:text-white font-semibold">
                        {item.label}
                      </span>
                    )}
                    {index < array.length - 1 && (
                      <FiChevronRight className="text-black dark:text-white" />
                    )}
                  </React.Fragment>
                ))}
              </nav>
              {headerActions && (
                <div className="flex items-center">
                  {headerActions}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Dropdown Button */}
          <div className="lg:hidden mb-4 relative">
            <div className="flex items-center gap-0">
              {/* Current Page Dropdown */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex-1 flex items-center justify-between bg-white dark:bg-[#111111] px-4 py-3 border border-neutral-200 dark:border-neutral-800"
              >
                <span className="text-black dark:text-white font-semibold text-base font-display">
                  {currentPageTitle}
                </span>
                <FiChevronDown
                  className={`w-5 h-5 text-black dark:text-white transition-transform ${
                    isSidebarOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {/* Filter Icon Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-[46px] h-[40px] flex items-center justify-center flex-shrink-0"
                aria-label="Toggle sidebar"
              >
                <FilterSliderIcon />
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isSidebarOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                ></div>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 right-0 z-50 mt-2">
                  <div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 shadow-lg">
                    <nav className="py-2">
                      {sidebarLinks.map((link) => {
                        const isActive =
                          pathname === link.href ||
                          (link.href === "/dashboard" && pathname === "/dashboard");
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`block px-4 py-3 text-gray-700 dark:text-white text-lg font-display transition-colors relative ${
                              isActive
                                ? "bg-[#0000000D] dark:bg-[#000000] border-l-4 border-red-600 font-semibold"
                                : "hover:bg-[#FFFFFF0A] font-semibold"
                            }`}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Desktop Sidebar - Always visible on lg and above */}
          <aside className="hidden lg:block w-full lg:w-[300px] flex-shrink-0">
            <div className="bg-white dark:bg-[#111111] py-8">
              <nav className="space-y-0">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href === "/dashboard" && pathname === "/dashboard");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 text-gray-700 dark:text-white text-lg font-display transition-colors relative ${
                        isActive
                          ? "bg-[#0000000D] dark:bg-[#000000] border-l-4 border-red-600 font-semibold"
                          : "hover:bg-[#FFFFFF0A] font-semibold"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

