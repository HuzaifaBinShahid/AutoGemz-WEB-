"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

import type { InputProps } from "@/interfaces";

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, label, error, leftIcon, rightIcon, type = "text", required = false, labelPosition, ...props },
        ref
    ) => {
        // Check if icons are ReactNode or string (Icon name)
        const isLeftIconString = typeof leftIcon === "string";
        const isRightIconString = typeof rightIcon === "string";

        // Base input classes with both light and dark classes - matching Dropdown styling
        const baseInputClasses = "w-full bg-[#0000000D] dark:bg-[#FFFFFF0D] border-2 px-5 md:py-[18px] py-[14px] text-[#0000008C] dark:text-white placeholder-gray-400 dark:placeholder-[#FFFFFFB2] text-base font-mulish placeholder:font-mulish placeholder:tracking-widest focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition";

        const inputWrapper = (
            <div className="relative">
                {leftIcon && (
                    <div className={cn(
                        "absolute inset-y-0 left-0 flex items-center",
                        isLeftIconString ? "pl-5 pointer-events-none" : "left-5 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    )}>
                        {typeof leftIcon === "string" ? (
                            <Icon
                                name={leftIcon}
                                className="text-gray-400 dark:text-white"
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
                        // Border colors - matching Dropdown conditional styling exactly
                        error
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-gray-300 dark:border-[#FFFFFF1A] focus:ring-red-600 dark:focus:ring-red-700",
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
                        isRightIconString ? "pr-5 pointer-events-none" : "right-0 top-1/2 transform -translate-y-1/2"
                    )}>
                        {typeof rightIcon === "string" ? (
                            <Icon
                                name={rightIcon}
                                className="text-gray-400 dark:text-white"
                                size={20}
                            />
                        ) : (
                            <div className="pointer-events-auto">
                                {rightIcon}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );

        // With label - responsive layout
        if (label) {
            // If labelPosition is "top", always show top layout
            if (labelPosition === "top") {
                return (
                    <div className="w-full">
                        <label
                            htmlFor={props.id}
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
                            htmlFor={props.id}
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
                                htmlFor={props.id}
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
    }
);

FormInput.displayName = "FormInput";

export default FormInput;
