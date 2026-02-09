import React from "react";
import Skeleton from "./Skeleton";

interface BlogSkeletonProps {
  count?: number;
}

const BlogSkeleton: React.FC<BlogSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        >
          <div className="p-6 space-y-4">
            <Skeleton variant="rectangular" height={24} className="w-3/4" />
            <Skeleton variant="text" height={16} className="w-full" />
            <Skeleton variant="text" height={16} className="w-5/6" />
            <Skeleton variant="text" height={16} className="w-4/6" />
            <div className="flex items-center justify-between">
              <Skeleton variant="text" height={14} width={80} />
              <Skeleton variant="text" height={14} width={100} />
            </div>
            <Skeleton variant="rectangular" height={36} width={100} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogSkeleton;

