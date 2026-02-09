"use client";

import React from "react";
import Icon from "./Icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  // Calculate which pages to show - always show 1 through maxVisiblePages
  const getVisiblePages = () => {
    return Array.from({ length: maxVisiblePages }, (_, i) => i + 1);
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
      {/* Page Number Buttons - Top row on mobile, middle on desktop */}
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        {visiblePages.map((page) => {
          const isActive = page === currentPage;
          const pageExists = page <= totalPages;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              disabled={!pageExists}
              className={`
                flex items-center justify-center
                w-[32px] h-[48px] sm:w-[36px] sm:h-[50px] md:w-[40px] md:h-[60px]
                text-sm sm:text-base
                font-display
                border
                font-bold
                transition-all duration-200
                ${isActive
                  ? "bg-[#DC37294D] border-[#DC3729] text-[#DC3729] cursor-default"
                  : pageExists
                    ? "dark:border-[#FFFFFF1A] border-[#00000012] dark:text-white text-black cursor-pointer hover:border-[#FFFFFF33]"
                    : "dark:border-[#FFFFFF1A] border-[#00000012] dark:text-white text-black opacity-30 cursor-not-allowed"
                }
              `}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
              aria-disabled={!pageExists}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Arrow Buttons - Bottom row on mobile, left/right on desktop */}
      <div className="flex items-center justify-center gap-2 md:gap-0">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrevious}
          disabled={isFirstPage}
          className={`
            flex items-center justify-center
            w-[60px] h-[40px] sm:w-[70px] sm:h-[44px] md:w-[80px] md:h-[48px]
            md:mr-4 lg:mr-10
            border
            transition-all duration-200
            ${isFirstPage
              ? "dark:border-[#FFFFFF1A] border-[#00000012] dark:text-white text-black cursor-not-allowed "
              : "bg-[#E54033] hover:bg-[#D32F2F] cursor-pointer dark:text-white text-black"
            }
          `}
          aria-label="Previous page"
        >
          <Icon 
            name="arrowLeft" 
            size={16}
            className={isFirstPage ? "dark:text-white text-black" : "text-white"}
          />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          disabled={isLastPage}
          className={`
            flex items-center justify-center
            w-[60px] h-[40px] sm:w-[70px] sm:h-[44px] md:w-[80px] md:h-[48px]
            font-display border
            md:ml-4 lg:ml-10
            transition-all duration-200
            ${isLastPage
              ? "dark:border-[#FFFFFF1A] border-[#00000012] dark:text-white text-black cursor-not-allowed"
              : "bg-[#E54033] hover:bg-[#D32F2F] cursor-pointer text-white"
            }
          `}
          aria-label="Next page"
        >
          <Icon 
            name="arrowRight" 
            size={16}
            className={isLastPage ? "dark:text-white text-black" : "text-white"}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
