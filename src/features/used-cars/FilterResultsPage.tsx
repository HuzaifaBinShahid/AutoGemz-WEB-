"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import CarCard, { CarCardProps } from "@/components/common/CarCard";
import FilterSidebar from "./FilterSidebar";
import { FilterState } from "@/interfaces";
import Pagination from "@/components/common/Pagination";
import LeftChevronIcon from "@/assets/svg/LeftChevronIcon";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import FilterIcon from "@/assets/svg/FilterIcon";

interface FilterResultsPageProps {
  initialCars?: CarCardProps[];
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
}

const FilterResultsPage: React.FC<FilterResultsPageProps> = ({
  initialCars = [],
  totalResults = 65091,
  currentPage: initialPage = 1,
  totalPages: initialTotalPages = 2604,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data - replace with actual data fetching
  const cars: CarCardProps[] = initialCars.length > 0
    ? initialCars
    : Array.from({ length: 15 }, (_, i) => ({
      id: `car-${i + 1}`,
      title: "2023 Ford Mustang GT",
      image: "/images/filter/Image1.jpg",
      currentBid: "12,00,00",
      mileage: "152,000 km",
      year: "2017",
      status: i % 3 === 0 ? "Available" : i % 3 === 1 ? "Item Sold" : "Coming Soon",
      timer: i % 2 === 0 ? "1H 45M 3S" : "1D 45M 3S",
    }));

  const startResult = (currentPage - 1) * 25 + 1;
  const endResult = Math.min(currentPage * 25, totalResults);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setCurrentPage(1);
    // Close filter overlay on mobile after applying filters
    setIsFilterOpen(false);
    // Here you would typically trigger a new data fetch
  };

  // Prevent body scroll when filter overlay is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  return (
    <div className="w-full min-h-screen  lg:mt-[150px] mt-[100px]">
      {/* Header Section with Breadcrumbs */}
      <div className="2xl:container 2xl:mx-auto px-4 2xl:px-8 py-6">
        {/* Go Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-red-600 transition-colors mb-4"
        >
          <span className="bg-customRed p-1">
          <BiChevronLeft  />

          </span>
          <span className="uppercase font-display  dark:text-white text-black text-sm">GO BACK</span>
        </Link>

        {/* Title and Results Count */}
        <div className=" gap-4 mb-[80px]">
          <div>
            <h1 className="text-4xl lg:text-[56px] font-semibold text-black dark:text-white uppercase font-display  align-middle">

              USED CARS FOR SALE IN PAKISTAN
            </h1>
            <div className="flex justify-between items-center">
              {/* Breadcrumbs */}
              <nav className="dark:text-white text-black text-sm flex gap-4 items-center mt-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <BiChevronRight className="w-5 h-5 hidden md:block" />
                <Link href="/used-cars" className="hover:text-white transition-colors hidden md:block">
                  Used Cars
                </Link>
                <BiChevronRight className="w-5 h-5" />
                <span className="dark:text-white text-black">Used Cars For Sale In Pakistan</span>
              </nav>
              {/* Results Count */}
              <div className="text-[#A5A5A5] text-sm font-medium hidden xl:block">
                {startResult} - {endResult} of <span className="font-semibold">{totalResults.toLocaleString()}
                </span>
                &nbsp; Results
              </div>
            </div>
            <div className="mt-5 xl:hidden flex justify-between items-center">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2"
                aria-label="Open filters"
              >
                <FilterIcon />
              </button>
              <div className=" text-black text-sm font-medium ">
                {startResult} - {endResult} of <span className="font-semibold">{totalResults.toLocaleString()}
                </span>
                &nbsp; Results
              </div>
            </div>
          </div>

        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters - Hidden on mobile/tablet, shown on xl */}
          <aside className="hidden xl:block xl:col-span-1">
            <div className="sticky top-6 z-10">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Right Side - Car Listings */}
          <div className="xl:col-span-3">
            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 mb-8">
              {cars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center py-8">
              <Pagination
                currentPage={currentPage}
                totalPages={initialTotalPages}
                onPageChange={handlePageChange}
                maxVisiblePages={5}
              />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Filter Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            ></div>
            
            {/* Filter Sidebar Panel */}
            <div className="absolute inset-y-0 left-0 w-full max-w-md bg-white dark:bg-black shadow-xl overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold text-black dark:text-white uppercase">
                  Filters
                </h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded transition-colors"
                  aria-label="Close filters"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterResultsPage;

