import React from "react";

interface InfoIconProps {
  size?: number;
  className?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ 
  size = 18, 
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3489_2969)">
        <path d="M9 0C4.02528 0 0 4.02564 0 9C0 13.9747 4.02564 18 9 18C13.9747 18 18 13.9744 18 9C18 4.02528 13.9743 0 9 0ZM9 16.5938C4.80259 16.5938 1.40625 13.1971 1.40625 9C1.40625 4.80259 4.80287 1.40625 9 1.40625C13.1974 1.40625 16.5938 4.80287 16.5938 9C16.5938 13.1974 13.1971 16.5938 9 16.5938Z" fill="#DC3729"/>
        <path d="M9 7.53516C8.61166 7.53516 8.29688 7.84995 8.29688 8.23828V12.7662C8.29688 13.1545 8.61166 13.4693 9 13.4693C9.38834 13.4693 9.70312 13.1545 9.70312 12.7661V8.23828C9.70312 7.84995 9.38834 7.53516 9 7.53516Z" fill="#DC3729"/>
        <path d="M9 6.67383C9.52424 6.67383 9.94922 6.24885 9.94922 5.72461C9.94922 5.20037 9.52424 4.77539 9 4.77539C8.47576 4.77539 8.05078 5.20037 8.05078 5.72461C8.05078 6.24885 8.47576 6.67383 9 6.67383Z" fill="#DC3729"/>
      </g>
      <defs>
        <clipPath id="clip0_3489_2969">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfoIcon;

