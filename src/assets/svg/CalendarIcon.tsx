import React from "react";

interface CalendarIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  className = "",
  width,
  height,
}) => {
  // If className includes responsive classes, don't set fixed width/height
  const isResponsive = className?.includes('w-full') || className?.includes('h-full');
  const svgWidth = isResponsive ? undefined : (width ?? 60);
  const svgHeight = isResponsive ? undefined : (height ?? 50);
  
  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Full background to cover entire button */}
      <rect x="0" y="0" width="60" height="60" fill="#DC3729" />
      {/* Original calendar icon content - centered */}
      <g transform="translate(1.5, 4)">
      <rect width="57" height="52" fill="transparent" />
      <path
        d="M23.1641 12.668V16.668"
        stroke="white"
        strokeWidth="1.33333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.8359 12.668V16.668"
        stroke="white"
        strokeWidth="1.33333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1641 22.1211H39.8307"
        stroke="white"
        strokeWidth="1.33333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.1121 31.0257L33.3921 35.7457C33.2054 35.9324 33.0321 36.2791 32.9921 36.5324L32.7387 38.3324C32.6454 38.9857 33.0988 39.4391 33.7521 39.3458L35.5521 39.0924C35.8054 39.0524 36.1654 38.8791 36.3388 38.6924L41.0588 33.9724C41.8721 33.1591 42.2588 32.2124 41.0588 31.0124C39.8721 29.8258 38.9254 30.2124 38.1121 31.0257Z"
        stroke="white"
        strokeWidth="1.33333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.4336 31.707C37.8336 33.147 38.9536 34.267 40.3936 34.667"
        stroke="white"
        strokeWidth="1.33333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.5 39.3327H23.1667C18.5 39.3327 16.5 36.666 16.5 32.666V21.3327C16.5 17.3327 18.5 14.666 23.1667 14.666H33.8333C38.5 14.666 40.5 17.3327 40.5 21.3327V25.9993"
        stroke="white"
        strokeWidth="1.33333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.4953 28.2663H28.5073"
        stroke="white"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5578 28.2663H23.5698"
        stroke="white"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5578 32.2663H23.5698"
        stroke="white"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="path-10-inside-1_3422_23060" fill="white">
        <path d="M0 0H57V52H0V0Z" />
      </mask>
      <path
        d="M0 0V-2H-2V0H0ZM57 0H59V-2H57V0ZM57 52V54H59V52H57ZM0 52H-2V54H0V52ZM0 0V2H57V0V-2H0V0ZM57 0H55V52H57H59V0H57ZM57 52V50H0V52V54H57V52ZM0 52H2V0H0H-2V52H0Z"
        fill="#DC3729"
        mask="url(#path-10-inside-1_3422_23060)"
      />
      </g>
    </svg>
  );
};

export default CalendarIcon;

