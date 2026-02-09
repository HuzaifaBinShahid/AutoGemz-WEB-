"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiChevronDown } from "react-icons/fi";
import ThemeToggle from "@/components/common/ThemeToggle";
import BellIcon from "@/assets/svg/BellIcon";
import MenuIcon from "@/assets/svg/MenuIcon";
import Button from "@/components/common/Button";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";

export default function Navbar() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch()
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle mounted state to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
      // Close navigation dropdown if clicking outside
      if (!(event.target as HTMLElement).closest(".nav-dropdown")) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout=()=>{
    dispatch(logout())
  }

  return (
    <nav className="lg:h-20 h-16 dark:border  bg-white dark:border-[#FFFFFF1A] dark:bg-black md:my-[10px] md:mx-[19px]">
      <div className="h-full">
        <div className="flex h-full items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src={
                  mounted && theme === "dark"
                    ? "/svgs/DarkLogo.svg"
                    : "/svgs/Logo.svg"
                }
                alt="Logo"
                width={122.61}
                height={40}
                className="w-20 h-8 md:w-[122.61px] md:h-[48px]"
                priority
              />
            </Link>
          </div>

          {/* Right Section - Navigation Links and Actions */}
          <div className="hidden items-center  xl:flex">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              if ("dropdown" in item && item.dropdown) {
                return (
                  <div key={item.label} className="nav-dropdown relative">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === item.label ? null : item.label
                        )
                      }
                      className={`flex items-center gap-1 px-3 py-2 text-sm  font-display font-semibold uppercase !tracking-[2px] ${
                        isActive
                          ? "text-customRed "
                          : "text-gray-700 dark:text-white"
                      }`}
                    >
                      {item.label}
                      <FiChevronDown className="h-4 w-4" />
                    </button>
                    {dropdownOpen === item.label && (
                      <div className="absolute top-full mt-2 min-w-[200px] rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        {item.dropdown.map(
                          (subItem: { label: string; href: string }) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                              {subItem.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-display font-semibold uppercase !tracking-[2px] ${
                    isActive
                      ? "text-customRed"
                      : "text-gray-700 dark:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <Button
              href="/dashboard"
              variant="animated"
              className="hidden xl:flex"
            >
              JOIN LIVE AUCTION
            </Button>
            { isAuthenticated && 
              <>
                <button className="hidden p-2 xl:flex">
                  <BellIcon width={32} height={32} showBadge={true}  />
                </button>
                <div className="relative hidden xl:flex" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src="https://i.pravatar.cc/150?u=user"
                      alt="User"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-accent"
                    />
                    <FiChevronDown className="h-4 w-4" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 min-w-[200px] rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile Settings
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Dashboard
                      </Link>
                      <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            }
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 xl:hidden"
            >
              {mobileMenuOpen ? <MenuIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-20 z-50 border-b bg-white shadow-lg dark:bg-gray-900 lg:hidden">
            <div className="space-y-4 px-4 py-4">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                if ("dropdown" in item && item.dropdown) {
                  return (
                    <div key={item.label}>
                      <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      {item.dropdown.map(
                        (subItem: { label: string; href: string }) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block py-2 pl-4 text-sm text-gray-600 dark:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        )
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block py-2 text-sm ${
                      isActive
                        ? "font-semibold text-primary"
                        : "text-gray-600 dark:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              { isAuthenticated && 
              <div className="space-y-3 border-t pt-4">
                <Button
                  href="/dashboard"
                  variant="animated"
                  className="block w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  JOIN LIVE AUCTION
                </Button>
                <div className="flex items-center gap-4">
                  <button className="p-2">
                    <BellIcon width={32} height={32} showBadge={true} />
                  </button>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src="https://i.pravatar.cc/150?u=user"
                      alt="User"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-accent"
                    />
                    <span>Profile</span>
                  </Link>
                </div>
              </div>
              }
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
