import React from "react";

interface DashedLineProps {
  className?: string;
}

const DashedLine: React.FC<DashedLineProps> = ({ 
  className = "" 
}) => {
  return (
    <svg 
      width="100%" 
      height="1" 
      className={`text-black/30 dark:text-white/30 ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 680 1"
    >
      <line 
        x1="0" 
        y1="0.5" 
        x2="680" 
        y2="0.5" 
        stroke="currentColor"
        strokeWidth="1" 
        strokeDasharray="9, 9"
      />
    </svg>
  );
};

export default DashedLine;

