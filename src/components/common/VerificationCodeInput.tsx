"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface VerificationCodeInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
  error?: string;
  className?: string;
}

export default function VerificationCodeInput({
  length = 6,
  onComplete,
  onChange,
  error,
  className,
}: VerificationCodeInputProps) {
  const [codes, setCodes] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    const codeString = newCodes.join("");
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(codeString);
    }

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all codes are filled
    if (newCodes.every((code) => code !== "") && onComplete) {
      onComplete(codeString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    
    if (/^\d+$/.test(pastedData)) {
      const newCodes = pastedData.split("").concat(Array(length - pastedData.length).fill(""));
      const finalCodes = newCodes.slice(0, length);
      setCodes(finalCodes);
      
      const codeString = finalCodes.join("");
      
      // Call onChange callback if provided
      if (onChange) {
        onChange(codeString);
      }
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      
      if (pastedData.length === length && onComplete) {
        onComplete(codeString);
      }
    }
  };

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-6 gap-6 ">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={codes[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "w-auto h-[56px] bg-[#FFFFFF0D] border border-[#FFFFFF2E] text-white text-center text-2xl font-mulish font-semibold focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition",
              error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-center text-sm text-danger-600 dark:text-danger-400 font-mulish">
          {error}
        </p>
      )}
    </div>
  );
}

