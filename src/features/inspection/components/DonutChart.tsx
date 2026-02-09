"use client";

import React, { useState, useEffect } from "react";

interface DonutChartProps {
  rating: number;
  maxRating: number;
  size?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ 
  rating, 
  maxRating, 
  size 
}) => {
  const [chartSize, setChartSize] = useState<number>(280.84063720703125);
  const [strokeWidth, setStrokeWidth] = useState<number>(50);

  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      if (size) {
        // If size prop is provided, use it but adjust strokeWidth
        setChartSize(size);
        setStrokeWidth(isMobile ? size * 0.18 : 50);
      } else {
        // Default responsive sizing
        const baseSize = isMobile ? 200 : 280.84063720703125;
        setChartSize(baseSize);
        setStrokeWidth(isMobile ? 35 : 50);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

  const percentage = (rating / maxRating) * 100;
  const radius = (chartSize * 0.7) / 2; // 70% of size for radius
  const center = chartSize / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  // Exact colors from design
  const orangeRed = "#E55B3F";
  const lightGray = "#D9D9D9";

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative w-[200px] h-[200px] md:w-[280.84px] md:h-[280.84px]" 
        style={{ 
          borderRadius: '10px',
          opacity: 1
        }}
      >
        <svg 
          className="transform -rotate-90 w-full h-full" 
          width={chartSize} 
          height={chartSize}
          viewBox={`0 0 ${chartSize} ${chartSize}`}
        >
          {/* Background circle - light gray */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={lightGray}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle - orange-red */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={orangeRed}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {rating}
          </span>
          <span className="text-base md:text-lg text-gray-500 dark:text-gray-400">
            / {maxRating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;

