import React from "react";
import Skeleton from "./Skeleton";

interface CardSkeletonProps {
  showImage?: boolean;
  showFooter?: boolean;
  lines?: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = false,
  showFooter = true,
  lines = 3,
}) => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {showImage && (
        <Skeleton variant="rectangular" height={200} className="w-full" />
      )}
      <div className="p-6 space-y-4">
        <Skeleton variant="rectangular" height={24} className="w-3/4" />
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            height={16}
            className={index === lines - 1 ? "w-5/6" : "w-full"}
          />
        ))}
        {showFooter && (
          <div className="flex items-center justify-between pt-4">
            <Skeleton variant="text" height={14} width={100} />
            <Skeleton variant="rectangular" height={32} width={80} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSkeleton;

