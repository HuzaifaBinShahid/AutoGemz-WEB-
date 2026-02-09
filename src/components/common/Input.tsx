"use client";

import React from "react";
import { cn } from "@/lib/utils";


import type { InputProps } from "@/interfaces";
import Icon from "./Icon";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      leftIcon,
      rightIcon,
      type = "text",
      colSpan,
      darkMode = false,
      labelPosition,
      ...props
    },
    ref
  ) => {
    // Check if icons are ReactNode or string (Icon name)
    const isLeftIconString = typeof leftIcon === "string";
    const isRightIconString = typeof rightIcon === "string";

    // Base input classes provided by user
    const baseInputClasses = "w-full bg-[#FFFFFF0D] border border-[#FFFFFF2E] px-5 py-[15.2px] text-white placeholder-[#FFFFFFB2] text-base font-mulish placeholder:font-mulish placeholder:tracking-widest focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition";

    const inputWrapper = (
      <div className="relative">
        {leftIcon && (
          <div className={cn(
            "absolute inset-y-0 left-0 flex items-center",
            isLeftIconString ? "pl-5 pointer-events-none" : "left-5 top-1/2 transform -translate-y-1/2"
          )}>
            {isLeftIconString ? (
              <Icon
                name={leftIcon}
                className="text-white"
                size={20}
              />
            ) : (
              leftIcon
            )}
          </div>
        )}
        <input
          type={type}
          className={cn(
            baseInputClasses,
            // Icon padding adjustments
            leftIcon && (isLeftIconString ? "pl-12" : "pl-14"),
            rightIcon && (isRightIconString ? "pr-12" : "pr-14"),
            // Error state
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          style={type === "date" ? {
            colorScheme: "dark",
            ...(props.style || {}),
          } : props.style}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className={cn(
            "absolute inset-y-0 right-0 flex items-center",
            isRightIconString ? "pr-5 pointer-events-none" : "right-5 top-1/2 transform -translate-y-1/2"
          )}>
            {isRightIconString ? (
              <Icon
                name={rightIcon}
                className="text-white"
                size={20}
              />
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>
    );

    // Determine label position: use labelPosition prop, or fallback to darkMode for backward compatibility
    const isLabelLeft = labelPosition === "left" || (labelPosition === undefined && darkMode);

    // Horizontal layout (label on left, input on right)
    if (label && isLabelLeft) {
      return (
        <div className={cn("w-full", colSpan === 2 && "md:col-span-2")}>
          <div className={cn("flex items-center gap-4")}>
            <label
              htmlFor={props.id}
              className={cn(
                "text-sm font-medium min-w-[140px] uppercase tracking-wide font-display",
                darkMode
                  ? "text-black dark:text-white"
                  : "text-neutral-700 dark:text-neutral-300"
              )}
            >
              {label}
            </label>
            <div className="flex-1">
              {inputWrapper}
            </div>
          </div>
          {error && (
            <p className="mt-1 text-sm text-danger-600 dark:text-danger-400 ml-[calc(140px+1rem)]">
              {error}
            </p>
          )}
        </div>
      );
    }

    // Vertical layout (label on top) - default
    return (
      <div className={cn("w-full", colSpan === 2 && "md:col-span-2")}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            {label}
          </label>
        )}
        {inputWrapper}
        {error && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
