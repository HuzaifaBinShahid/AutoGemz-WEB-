import React, { Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

interface MainLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showNavbar = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col ">
      {showNavbar && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
      )}
      <main className={`flex-grow ${showNavbar ? "" : ""}`}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
      {showFooter && <Footer />}
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;

