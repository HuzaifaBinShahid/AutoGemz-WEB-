"use client";

import React from "react";
import Icon from "./Icon";
import { cn } from "@/lib/utils";

interface FilterInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: string;
  onRightIconClick?: () => void;
  className?: string;
  error?: string;
}

const FilterInput = React.forwardRef<HTMLInputElement, FilterInputProps>(
  (
    {
      rightIcon = "send",
      onRightIconClick,
      className,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative w-full", className)}>
        <div className="flex dark:border  dark:border-[#FFFFFF2E]">
          {/* Left Section - Black background with input */}
          <input
            type="text"
            ref={ref}
            className={cn(
              "flex-1 bg-[#f4f4f4] dark:bg-[#111111] text-left px-4 py-3 text-gray-400 dark:text-[#FFFFFFB2] font-display focus:outline-none hover:bg-white-90 dark:hover:bg-[#111111]/90 transition-colors placeholder:text-gray-500 dark:placeholder:text-[#FFFFFF66]",
              error && "border-red-500 focus:border-red-500"
            )}
            {...props}
          />

          {/* Right Section - Red square with icon */}
          <button
            type="button"
            onClick={onRightIconClick}
            className="w-12 h-[54px] bg-customRed dark:bg-customRed flex items-center justify-center flex-shrink-0 focus:outline-none hover:bg-customRed/90 dark:hover:bg-customRed/90 transition-colors"
          >
            <Icon name={rightIcon} size={20} className="text-white dark:text-white" />
          </button>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FilterInput.displayName = "FilterInput";

export default FilterInput;

