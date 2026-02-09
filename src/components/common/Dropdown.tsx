"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[] | string[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxHeight?: string;
  error?: string;
  required?: boolean;
  labelPosition?: "left" | "top";
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "SELECT",
  className,
  maxHeight = "max-h-60",
  error,
  required = false,
  labelPosition,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Normalize options to always have { value, label } format
  const normalizedOptions: DropdownOption[] = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    // Delay to avoid immediate closure from the opening click
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Dropdown button wrapper
  const dropdownWrapper = (
    <div className="relative flex-1 min-w-0" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={cn(
          "w-full   text-left text-gray-900   font-display uppercase flex items-center justify-between   bg-[#0000000D] dark:bg-[#FFFFFF0D] border-2 border-[#0000004D] dark:border-[#FFFFFF2E] px-5 md:py-[18px] py-[14px] text-[#0000008C] dark:text-white placeholder-gray-400 dark:placeholder-[#FFFFFFB2] text-base placeholder:font-mulish placeholder:tracking-widest focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition",
          error
            ? "border-red-500 focus:ring-red-500/20"
            : "border-gray-300 dark:border-[#FFFFFF1A] focus:ring-red-600 dark:focus:ring-red-700"
        )}
      >
        <span
          className={
            value ? "" : "text-gray-400 dark:text-gray-500"
          }
        >
          {selectedOption?.label || placeholder}
        </span>
        <FiChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-full mt-1 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#FFFFFF1A] shadow-lg overflow-y-auto rounded",
            maxHeight
          )}
        >
          {normalizedOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#FFFFFF0D] uppercase font-display"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );

  // If labelPosition is "top", always show top layout
  if (labelPosition === "top") {
    return (
      <div className={cn("w-full", className)}>
        <label className="block text-xs sm:text-sm font-medium text-[#0000008C] dark:text-white mb-2 uppercase tracking-wide font-display">
          {label}
          {required && <span className="text-red-500 ml-1 text-2xl">*</span>}
        </label>
        {dropdownWrapper}
      </div>
    );
  }

  // If labelPosition is "left" or undefined, show top on mobile, left on lg+
  return (
    <div className={cn("w-full", className)}>
      {/* Top layout for mobile (below lg) */}
      <div className="block lg:hidden">
        <label className="block text-xs sm:text-sm font-medium text-[#0000008C] dark:text-white mb-2 uppercase tracking-wide font-display">
          {label}
          {required && <span className="text-red-500 ml-1 text-2xl">*</span>}
        </label>
        {dropdownWrapper}
      </div>

      {/* Horizontal layout for lg and above */}
      <div className="hidden lg:block">
        <div className="relative flex flex-row items-center gap-2 sm:gap-4 flex-nowrap">
          <label className="text-xs sm:text-sm font-medium text-[#0000008C] dark:text-white w-[80px] sm:w-[100px] md:min-w-[140px] text-right uppercase tracking-wide font-display flex-shrink-0">
            {label}
            {required && <span className="text-red-500 ml-1 text-2xl">*</span>}
          </label>
          {dropdownWrapper}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

