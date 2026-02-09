"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="w-full">
      {/* Page Header */}
    
      {/* Error Content */}
      <div className="w-full flex items-center justify-center min-h-[60vh] mt-24 px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-[#2E2E2E] border border-[#00000012] dark:border-[#FFFFFF1A] rounded-lg p-8 text-center">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-customRed/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-customRed"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white uppercase font-display mb-4">
              Something went wrong!
            </h2>

            {/* Error Message */}
            <p className="text-black dark:text-white text-sm md:text-base mb-8 opacity-90">
              {error.message ||
                "An unexpected error occurred. Please try again."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" onClick={reset}>
                Try Again
              </Button>
              <Link href="/">
                <Button
                  variant="secondary"
                >
                  Go Home
                </Button>
              </Link>
            </div>

            {/* Error Details (for development) */}
            {process.env.NODE_ENV === "development" && error.digest && (
              <div className="mt-8 pt-8 border-t border-[#00000012] dark:border-[#FFFFFF1A]">
                <p className="text-xs text-black/60 dark:text-white/60 font-mono">
                  Error ID: {error.digest}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
