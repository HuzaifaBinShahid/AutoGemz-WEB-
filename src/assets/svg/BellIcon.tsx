"use client";

import React, { useId } from "react";

interface BellIconProps {
  width?: number;
  height?: number;
  className?: string;
  showBadge?: boolean;
}

export default function BellIcon({
  width = 32,
  height = 32,
  className = "",
  showBadge = true,
}: BellIconProps) {
  const clipId = useId();
  
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-black dark:text-white ${className}`}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M13.3341 32C15.7488 32 17.7689 30.2786 18.2328 28H8.43539C8.89952 30.2786 10.9195 32 13.3341 32ZM22.6835 15.9987C22.6781 15.9987 22.6727 16 22.6673 16C17.5221 16 13.3341 11.8132 13.3341 6.66675C13.3341 5.25194 13.6595 3.91456 14.2261 2.71194C13.9327 2.68406 13.6353 2.66675 13.3341 2.66675C8.17952 2.66675 4.00083 6.84519 4.00083 12V15.7173C4.00083 18.3559 2.84483 20.8467 0.816704 22.5612C0.140704 23.1387 -0.159296 24.0586 0.083329 24.9561C0.366016 26 1.39802 26.6667 2.48083 26.6667H24.1807C25.3166 26.6667 26.3875 25.9307 26.618 24.8174C26.7967 23.9561 26.49 23.0959 25.822 22.5347C23.8833 20.9094 22.7621 18.5212 22.6835 15.9987Z"
          fill="currentColor"
        />
        {showBadge && (
          <path
            d="M29.3333 6.66675C29.3333 10.3486 26.3486 13.3333 22.6665 13.3333C18.9846 13.3333 16 10.3486 16 6.66675C16 2.98487 18.9846 0 22.6665 0C26.3486 0 29.3333 2.98487 29.3333 6.66675Z"
            fill="#DC3729"
          />
        )}
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

