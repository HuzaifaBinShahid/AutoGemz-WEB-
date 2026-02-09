import React from "react";
import Link from "next/link";
import { BlogPost } from "@/interfaces";
import MilageIcon from "@/assets/svg/MilageIcon";
import ScheduleIcon from "@/assets/svg/ScheduleIcon";
import FlameIcon from "@/assets/svg/FlameIcon";
import DotIcon from "@/assets/svg/DotIcon";

interface BlogCardProps {
  post: BlogPost & {
    category?: string;
    isHot?: boolean;
    carName?: string;
    currentBid?: number;
    price?: number;
    mileage?: string;
    year?: string;
    timeRemaining?: string;
    titleClassName?: string;
    status?: string | "active" | "soon" | "close";
  };
  titleClassName?: string;
  link?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, titleClassName, link }) => {
  // Format date to get day of week and day number
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
    const day = date.getDate();
    return { dayOfWeek, day };
  };

  const dateInfo = post.date ? formatDate(post.date) : null;
  const { dayOfWeek, day } = dateInfo || { dayOfWeek: "", day: "" };

  // Truncate excerpt to max 80 characters
  const truncateExcerpt = (text: string | undefined, maxLength: number = 90) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  // Format currency (Indian Rupees format)
  const formatCurrency = (amount: number | undefined): string => {
    if (!amount) return "RS: 0";
    return `RS: ${amount.toLocaleString("en-IN")}`;
  };

  // Get status background color
  const getStatusBgColor = (status: string | undefined): string => {
    switch (status?.toLowerCase()) {
      case "active":
        return "#2DD4BF";
      case "soon":
        return "#F59E0B";
      case "close":
        return "#BAC0CA";
      default:
        return "#BAC0CA";
    }
  };

  return (
    <Link href={link || `/blog/${post.id}`} className="block">
      <div className="bg-white dark:bg-black overflow-hidden shadow-sm dark:shadow-gray-900/50 hover:shadow-md dark:hover:shadow-gray-900/70 transition-shadow duration-300 dark:border dark:border-[#FFFFFF1A] cursor-pointer">
        <div className="relative h-[75px] z-10">
          {/* Date Overlay - Top Left */}
          {post.date && (
            <div className="absolute top-4 left-4 h-[105px] w-[90px] bg-red-600 dark:bg-red-700 px-7 py-[18px] shadow-lg dark:shadow-gray-900/50">
              <div className="flex flex-col items-center justify-center">
                <div className="text-white text-sm font-normal uppercase font-display tracking-wide">
                  {dayOfWeek}
                </div>
                <div className="text-white text-[34px] font-display leading-none mt-2">
                  {day}
                </div>
              </div>
            </div>
          )}
          {post.status && (
            <div 
              className="absolute top-4 left-4 h-[105px] w-[90px] px-7 py-[18px] shadow-lg dark:shadow-gray-900/50"
              style={{ backgroundColor: getStatusBgColor(post.status) }}
            >
              <div className="flex flex-col items-center justify-center">
               <DotIcon/>
                <div className="text-white text-lg font-display leading-none mt-5 uppercase">
                {post.status}
                </div>
              </div>
            </div>
          )}

          {/* Category Tag - Top Right */}
          {post.category && (
            <div className="absolute top-4 right-4 border-[#00000012] dark:border-[#FFFFFF1A] border bg-gray-200 dark:bg-[#FFFFFF2A] px-3 py-1">
              <div className="flex items-center justify-center ">
                <span className="text-black dark:text-white text-sm font-display font-semibold uppercase  tracking-wide">
                  {post.category}
                </span>
              </div>
            </div>
          )}
          {post.isHot && (
            <div className="absolute top-4 right-[120px] border-[#00000012] dark:border-[#FFFFFF1A] border bg-gray-200 dark:bg-[#FFFFFF2A] px-3 py-1">
              <div className="flex items-center gap-2 justify-center ">
                <FlameIcon/>
                <span className="text-black dark:text-white text-sm font-display font-semibold uppercase  tracking-wide">
                  HOT
                </span>
              </div>
            </div>
          )}
          {post.timeRemaining && (
            <div className="absolute top-4 right-4 border-[#00000012] dark:border-[#FFFFFF1A] border bg-gray-200 dark:bg-[#FFFFFF2A] px-3 py-1">
              <div className="flex items-center justify-center ">
                <span className="text-black dark:text-white text-sm font-display font-semibold uppercase  tracking-wide">
                  {post.timeRemaining}
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Image Section with Overlays */}
        <div className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden z-0">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(235.43deg, rgba(255, 77, 36, 0.5) 0%, rgba(0, 0, 0, 0.03) 28%, rgba(0, 0, 0, 0) 67%, rgba(255, 77, 36, 0.6) 100%, #333333 100%)",
            }}
          ></div>
        </div>

        {/* Text Content Section */}
        <div className="p-4 md:p-6 bg-white dark:bg-black dark:border dark:border-[#FFFFFF1A]">
          {/* Car Name / Title with Red Line - Centered */}
          {(post.carName || post.title) && (
            <div className="flex items-center  gap-3 mb-6">
               {!post.title && (
               <div className="w-1 h-8 bg-customRed"></div>
          )}
              <h3 className={`md:text-2xl text-sm font-medium text-black dark:text-white font-display leading-tight uppercase line-clamp-2 ${titleClassName ? titleClassName : ""}`}>
                {post.carName || post.title}
                </h3>
             
            </div>
          )}

          {/* Car Details Section */}
          {(post.currentBid || post.price || post.mileage || post.year) && (
            <div className="flex justify-between gap-6 ">
              {/* Left Column - Current Bid / Price */}
              <div className="flex flex-col">
                {(post.currentBid || post.price) && (
                  <>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-display tracking-wide mb-1">
                      {(post.currentBid !== undefined) ? "CURRENT BID" : "PRICE"}
                    </div>
                    <div className="text-lg font-medium text-black dark:text-white font-display">
                      {post.currentBid !== undefined 
                        ? formatCurrency(post.currentBid)
                        : formatCurrency(post.price)}
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Mileage and Year */}
              <div className="flex flex-col gap-2">
                {post.mileage && (
                  <div className="flex items-center gap-2">
                  <MilageIcon/>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-display">
                      {post.mileage}
                    </span>

                  </div>
                )}
                {post.year && (
                  <div className="flex items-center gap-2">
                   <ScheduleIcon/>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-display">
                      {post.year}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-black dark:text-[#A5A5A5] font-display leading-relaxed">
              {truncateExcerpt(post.excerpt)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;