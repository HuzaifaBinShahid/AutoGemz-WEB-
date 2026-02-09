"use client";

import React from "react";

interface QuoteIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function QuoteIcon({
  width = 60,
  height = 60,
  className,
}: QuoteIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M37.5 52.5H52.5C53.4946 52.5 54.4484 52.1049 55.1516 51.4016C55.8549 50.6984 56.25 49.7446 56.25 48.75V33.75C56.25 32.7554 55.8549 31.8016 55.1516 31.0984C54.4484 30.3951 53.4946 30 52.5 30H41.25C41.25 21.7275 47.9775 15 56.25 15V7.5C43.8413 7.5 33.75 17.5912 33.75 30V48.75C33.75 49.7446 34.1451 50.6984 34.8484 51.4016C35.5516 52.1049 36.5054 52.5 37.5 52.5ZM7.5 52.5H22.5C23.4946 52.5 24.4484 52.1049 25.1516 51.4016C25.8549 50.6984 26.25 49.7446 26.25 48.75V33.75C26.25 32.7554 25.8549 31.8016 25.1516 31.0984C24.4484 30.3951 23.4946 30 22.5 30H11.25C11.25 21.7275 17.9775 15 26.25 15V7.5C13.8412 7.5 3.75 17.5912 3.75 30V48.75C3.75 49.7446 4.14509 50.6984 4.84835 51.4016C5.55161 52.1049 6.50544 52.5 7.5 52.5Z"
        className="fill-black dark:fill-white opacity-30"
      />
    </svg>
  );
}

