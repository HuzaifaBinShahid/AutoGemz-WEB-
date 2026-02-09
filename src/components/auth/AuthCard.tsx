import React from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "max-w-md w-full space-y-8 bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800",
          className
        )}
      >
        <div>
          <h2 className="text-center text-3xl font-display font-bold text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className="space-y-6">{children}</div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
};

export default AuthCard;

