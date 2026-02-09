import React from "react";
import Skeleton from "./Skeleton";

interface PageSkeletonProps {
  showHeader?: boolean;
  showContent?: boolean;
  contentLines?: number;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({
  showHeader = true,
  showContent = true,
  contentLines = 5,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      {showHeader && (
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={48} className="w-1/3" />
          <Skeleton variant="text" height={24} className="w-2/3" />
        </div>
      )}
      
      {showContent && (
        <div className="space-y-4">
          {Array.from({ length: contentLines }).map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              height={20}
              className={index === contentLines - 1 ? "w-5/6" : "w-full"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageSkeleton;

