"use client";

import { ReactNode } from "react";

interface GlassmorphismWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function GlassmorphismWrapper({
  children,
  className = "",
}: GlassmorphismWrapperProps) {
  return (
    <div
      className={`relative backdrop-blur-sm bg-black/30 border border-gray-600/30 lg:p-10 p-5 ${className}`}
    >
      {/* Top Left Corner Dot */}
      <div className="absolute -top-1 -left-1 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 bg-red-500"></div>
      </div>
      {/* Top Right Corner Dot */}
      <div className="absolute -top-1 -right-3 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 bg-red-500"></div>
      </div>
      {/* Bottom Left Corner Dot */}
      <div className="absolute -bottom-3 -left-[5px] transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 bg-red-500"></div>
      </div>
      {/* Bottom Right Corner Dot */}
      <div className="absolute -bottom-3 -right-[11px] transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 bg-red-500"></div>
      </div>
      {/* Children Content */}
      {children}
    </div>
  );
}

