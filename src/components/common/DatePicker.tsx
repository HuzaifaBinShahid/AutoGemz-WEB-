"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import CalendarIcon from "@/assets/svg/CalendarIcon";

interface DatePickerProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  id?: string;
  required?: boolean;
  labelPosition?: "left" | "top";
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = "SELECT",
  error,
  className,
  id,
  required = false,
  labelPosition,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.showPicker();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (onChange) {
      onChange(dateValue);
    }
    // Update the display input to show formatted date
    if (displayInputRef.current) {
      if (dateValue) {
        const date = new Date(dateValue);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        displayInputRef.current.value = formattedDate;
      } else {
        displayInputRef.current.value = "";
      }
    }
  };

  // Format the value for display
  const displayValue = value
    ? (() => {
        try {
          const date = new Date(value);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        } catch {
          return value;
        }
      })()
    : "";

  const inputWrapper = (
    <div className="relative flex items-stretch">
      {/* Hidden actual date input */}
      <input
        ref={inputRef}
        type="date"
        value={value || ""}
        onChange={handleDateChange}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        id={id ? `${id}-hidden` : undefined}
      />
      
      {/* Display input field */}
      <input
        ref={displayInputRef}
        type="text"
        readOnly
        value={displayValue}
        placeholder={placeholder}
        onClick={handleButtonClick}
        className={cn(
          "flex-1 bg-gray-100 dark:bg-[#FFFFFF0D] border-2 border-gray-300 dark:border-[#FFFFFF1A] border-r-0 rounded-none px-5 md:py-[18px] py-[14px] text-[#0000008C] dark:text-white placeholder-gray-500 dark:placeholder-[#FFFFFFB2] text-base font-mulish placeholder:font-mulish placeholder:tracking-widest placeholder:uppercase focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition cursor-pointer",
          error
            ? "border-red-500 focus:ring-red-500/20"
            : "border-gray-300 dark:border-[#FFFFFF1A]",
          className
        )}
        id={id}
      />
      
      {/* Red calendar button */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="flex-shrink-0 w-[60px] flex items-center justify-center transition-opacity hover:opacity-90 border-2 bg-transparent dark:border-[#FFFFFF1A] border-l-0 rounded-none p-0 overflow-hidden self-stretch"
        aria-label="Open date picker"
      >
        <CalendarIcon className="w-full h-full" />
      </button>
    </div>
  );

  // With label - responsive layout
  if (label) {
    // If labelPosition is "top", always show top layout
    if (labelPosition === "top") {
      return (
        <div className="w-full">
          <label
            htmlFor={id}
            className="block text-xs sm:text-sm font-medium text-[#0000008C] dark:text-white mb-2 uppercase tracking-wide font-display"
          >
            {label}
            {required && <span className="text-red-500 ml-1 text-2xl">*</span>}
          </label>
          {inputWrapper}
          {error && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      );
    }

    // If labelPosition is "left" or undefined, show top on mobile, left on lg+
    return (
      <div className="w-full">
        {/* Top layout for mobile (below lg) */}
        <div className="block lg:hidden">
          <label
            htmlFor={id}
            className="block text-xs sm:text-sm font-medium text-[#0000008C] dark:text-white mb-2 uppercase tracking-wide font-display"
          >
            {label}
            {required && <span className="text-red-500 ml-1 text-2xl">*</span>}
          </label>
          {inputWrapper}
          {error && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* Horizontal layout for lg and above */}
        <div className="hidden lg:block">
          <div className="flex flex-row items-center gap-2 sm:gap-4 flex-nowrap overflow-hidden">
            <label
              htmlFor={id}
              className="text-xs sm:text-sm font-medium text-[#0000008C] dark:text-white w-[80px] sm:w-[100px] md:min-w-[140px] text-right uppercase tracking-wide font-display flex-shrink-0"
            >
              {label}
              {required && <span className="text-red-500 ml-1 text-2xl">*</span>}
            </label>
            <div className="flex-1 min-w-0">
              {inputWrapper}
            </div>
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400 ml-[calc(80px+0.5rem)] sm:ml-[calc(100px+1rem)] md:ml-[calc(140px+1rem)]">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  // No label - just return input wrapper
  return (
    <div className="w-full">
      {inputWrapper}
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default DatePicker;

