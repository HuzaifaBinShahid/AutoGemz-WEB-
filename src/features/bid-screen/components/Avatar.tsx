"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  name: string;
  size?: number;
  borderWidth?: number;
  isYou?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 40, borderWidth = 1, isYou = false }) => {
  const [imgError, setImgError] = useState(false);
  const cleanName = name.replace(" (You)", "");
  const sizeClass = size === 48 ? "w-12 h-12" : "w-10 h-10";
  const borderClass = borderWidth === 2 ? "border-2" : "border";
  const textSizeClass = size === 48 ? "text-sm" : "text-xs";
  const borderColor = isYou ? "border-orange-500" : "border-white";

  const getInitials = (name: string) => {
    const names = name.replace(" (You)", "").split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name.replace(" (You)", "")
    )}&background=random&color=fff&size=128&bold=true`;
  };

  // Generate consistent color based on name
  const colors = [
    "bg-purple-500",
    "bg-orange-500",
    "bg-teal-600",
    "bg-pink-500",
    "bg-blue-500",
    "bg-indigo-500",
  ];
  const colorIndex = cleanName.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={`${sizeClass} ${borderClass} ${borderColor} rounded-full overflow-hidden ${bgColor} flex-shrink-0 flex items-center justify-center`}
    >
      {!imgError ? (
        <Image
          src={getAvatarUrl(name)}
          alt={cleanName}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={`text-white font-semibold font-display ${textSizeClass}`}>
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

export default Avatar;

