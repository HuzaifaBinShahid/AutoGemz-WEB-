"use client";

import React from "react";

interface StarIconProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

export default function StarIcon({
  width = 24,
  height = 24,
  className,
  fill = "#DC3729",
}: StarIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.6772 4.31229C11.0937 3.0303 12.9074 3.0303 13.3239 4.31229L14.4998 7.93129C14.6861 8.50462 15.2204 8.89279 15.8232 8.89279H19.6285C20.9764 8.89279 21.5369 10.6177 20.4464 11.41L17.3678 13.6467C16.8801 14.001 16.6761 14.6291 16.8624 15.2024L18.0382 18.8214C18.4548 20.1034 16.9875 21.1695 15.897 20.3771L12.8185 18.1405C12.3308 17.7861 11.6704 17.7861 11.1827 18.1405L8.10416 20.3771C7.01363 21.1695 5.54634 20.1034 5.96288 18.8214L7.13877 15.2024C7.32505 14.6291 7.12098 14.001 6.63328 13.6467L3.55478 11.41C2.46425 10.6177 3.0247 8.89279 4.37267 8.89279H8.17791C8.78074 8.89279 9.31501 8.50462 9.50129 7.93129L10.6772 4.31229Z"
        fill={fill}
      />
    </svg>
  );
}

