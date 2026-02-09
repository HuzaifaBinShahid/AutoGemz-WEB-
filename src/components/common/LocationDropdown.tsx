"use client";

import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import { cn } from "@/lib/utils";

interface LocationDropdownOption {
  value: string;
  label: string;
}

interface LocationDropdownProps {
  value: string;
  options: LocationDropdownOption[] | string[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxHeight?: string;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = "SELECT",
  className,
  maxHeight = "max-h-60",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize options to always have { value, label } format
  const normalizedOptions: LocationDropdownOption[] = options.map((option) =>
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

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <div className="flex dark:border dark:border-[#FFFFFF2E]">
        {/* Left Section - Black background with selected value */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex-1 bg-[#f4f4f4] dark:bg-[#111111] text-left px-4 py-3 text-gray-400 dark:text-[#FFFFFFB2] font-display focus:outline-none hover:bg-white-90 dark:hover:bg-[#111111]/90 transition-colors placeholder:text-gray-500 dark:placeholder:text-[#FFFFFF66]"
        >
          <span className={value ? "text-gray-400 dark:text-[#FFFFFFB2]" : "text-gray-500 dark:text-[#FFFFFF66]"}>
            {selectedOption?.label || placeholder}
          </span>
        </button>

        {/* Right Section - Red square with chevron */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="w-12 h-[54px] bg-customRed dark:bg-customRed flex items-center justify-center flex-shrink-0 focus:outline-none hover:bg-customRed/90 dark:hover:bg-customRed/90 transition-colors"
        >
          <Icon name="chevronDown" size={20} className="text-white dark:text-white" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-10 w-full mt-1 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#FFFFFF1A] shadow-lg overflow-y-auto rounded",
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
              className="w-full px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#FFFFFF0D] uppercase font-display transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;

