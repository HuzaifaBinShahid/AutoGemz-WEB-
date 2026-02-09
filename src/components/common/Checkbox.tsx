"use client";

import React from "react";
import { cn } from "@/lib/utils";

import type { CheckboxProps } from "@/interfaces";

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, checked, onChange, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-center ">
          <input
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:ring-primary-400",
              error && "border-danger-500",
              className
            )}
            ref={ref}
            checked={checked}
            onChange={onChange}
            {...props}
          />
          {label && (
            <label
              htmlFor={props.id}
              className="ml-2 text-sm text-neutral-700 dark:text-neutral-300"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

