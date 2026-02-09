"use client";

import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Auth pages don't show footer
  const isAuthPage = pathname?.startsWith("/auth");
  
  // Determine if navbar should be shown (default: true)
  const showNavbar = true;
  
  // Footer is hidden on auth pages
  const showFooter = !isAuthPage;

  return (
    <MainLayout showNavbar={showNavbar} showFooter={showFooter}>
      {children}
    </MainLayout>
  );
}

