"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "./Icon";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: "default" | "animated" | "fill" | "outline" | "ghost" | "danger" | "link" | "primary" | "secondary" | "auth";
  size?: "sm" | "md" | "lg";
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  color?: string;
  [key: string]: any;
}

export default function Button({
  children,
  className,
  href,
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  isLoading,
  disabled,
  onClick,
  type = "button",
  ...props
}: CustomButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    isLoading && "cursor-wait"
  );

  // Variant styles - support both common and ui variants
  const variantClasses: Record<string, string> = {
    default:
      "w-full bg-customRed tracking-widest hover:bg-customRed/80 text-white font-semibold py-[15.2px] transition duration-200 text-sm tracking-wide ",
    animated:
      "group relative overflow-hidden bg-customRed  font-semibold text-white transition-all hover:bg-customRed/90  ",
    fill: "bg-customRed-600 text-white hover:bg-customRed-700 focus:ring-customRed-500 dark:bg-customRed-500 dark:hover:bg-customRed-600  ",
    outline:
      "border-2 border-customRed-600 text-customRed-600 hover:bg-customRed-50 focus:ring-customRed-500 dark:border-customRed-400 dark:text-customRed-400 dark:hover:bg-customRed-900/20 ",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-800 ",
    danger:
      "bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 dark:bg-danger-500 dark:hover:bg-danger-600 ",
    link:
      "bg-transparent text-white hover:text-red-400 underline font-normal p-0 focus:ring-0 focus:ring-offset-0",
    // UI variants mapped to common variants
    primary:
      "bg-customRed text-white hover:bg-customRed/80 focus:ring-customRed dark:bg-customRed dark:hover:bg-customRed/80 ",
    secondary:
      "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-500 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600 ",
    auth:
      "relative dark:bg-black/80 bg-white hover:bg-white/80 dark:hover:bg-black/90 border-t border-r border-b border-white/20 rounded-sm transition-all duration-200 group pl-4 w-[234px] h-[62px]",
  };

  // Size styles
  const sizeClasses: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md:
      variant === "default"
        ? ""
        : variant === "link"
        ? "text-sm"
        : variant === "primary" || variant === "secondary"
        ? "px-4 py-2 text-base"
        : variant === "auth"
        ? ""
        : "px-[23.5px] py-[14px] text-[20px] font-display",
    lg: "px-6 py-3 text-lg",
  };

  const buttonContent = (
    <>
      {variant === "auth" && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EA4335]"></div>
      )}
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && leftIcon && (
        <Icon
          name={leftIcon}
          className="mr-2"
          size={size === "sm" ? 16 : size === "lg" ? 20 : 18}
        />
      )}
      <span className={cn(
        variant === "animated" ? "relative z-10" : "",
        variant === "auth" ? "font-display font-semibold text-base md:text-lg lg:text-xl uppercase tracking-wide text-[#EA4335] group-hover:text-[#EA4335]/90" : ""
      )}>
        {children}
      </span>
      {!isLoading && rightIcon && (
        <Icon
          name={rightIcon}
          className="ml-2"
          size={size === "sm" ? 16 : size === "lg" ? 20 : 18}
        />
      )}
      {variant === "animated" && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-red-900/50 to-transparent dark:via-white/90"></div>
      )}
    </>
  );

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={
          disabled || isLoading
            ? undefined
            : (onClick as
                | React.MouseEventHandler<HTMLAnchorElement>
                | undefined)
        }
        {...(disabled || isLoading ? { "aria-disabled": true } : {})}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
