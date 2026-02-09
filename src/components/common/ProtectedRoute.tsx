"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Don't render content if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 dark:text-white">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}

