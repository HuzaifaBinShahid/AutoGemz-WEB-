import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "rectangular",
      width,
      height,
      animation = "pulse",
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = "bg-neutral-200 dark:bg-neutral-800";
    
    const variants = {
      text: "rounded",
      circular: "rounded-full",
      rectangular: "rounded-lg",
    };

    const animations = {
      pulse: "animate-pulse",
      wave: "animate-shimmer",
      none: "",
    };

    const customStyle: React.CSSProperties = {
      width: width || undefined,
      height: height || undefined,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          animations[animation],
          className
        )}
        style={customStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;

