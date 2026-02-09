"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import { cn } from "@/lib/utils";
import LocationDropdown from "@/components/common/LocationDropdown";
import FilterInput from "@/components/common/FilterInput";
import PriceFilterIcon from "@/assets/svg/PriceFilterIcon";
import CalendarIcon from "@/assets/svg/CalendarIcon";
import MilageFilterIcon from "@/assets/svg/MilageFilterIcon";
import BodyTypeFilterIcon from "@/assets/svg/BodyTypeFilterIcon";
import { FilterState } from "@/interfaces";
import {
  BODY_TYPES,
  SPECIFICATIONS,
  CITIES,
  TRANSMISSION_TYPES,
  NUMBER_OF_SEATS,
  COLORS,
} from "@/constants/constants";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "Lahore",
    registeredIn: "Lahore",
    priceMin: 0,
    priceMax: 300000,
    yearMin: 2006,
    yearMax: 2024,
    mileageMin: 0,
    mileageMax: 300000,
    modelCategory: "Family Cars",
    transmissionType: "Automatic Matic",
    numberOfSeats: "Seats 2",
    color: "Black",
    specifications: [],
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleSpecification = (spec: string) => {
    const newSpecs = filters.specifications.includes(spec)
      ? filters.specifications.filter((s) => s !== spec)
      : [...filters.specifications, spec];
    updateFilter("specifications", newSpecs);
  };


  return (
    <div className="w-full space-y-6 dark:bg-[#111111] bg-white px-4 py-8">
      <div className="flex justify-between items-center">
      {/* Title */}
      <h2 className="text-black dark:text-white text-xl font-bold uppercase font-display">
        FILTERS
      </h2>
<div>
<span className="text-customRed cursor-pointer underline text-sm font-medium">CLEAR ALL</span>
</div>
      </div>

      {/* Search Input with Red Button */}
      <FilterInput placeholder="e.g. Honda in Lahore" />

      {/* City Filter */}
      <div className="space-y-2">
        <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white mb-2  font-display">
          City
        </label>
        <LocationDropdown
          value={filters.city}
          options={CITIES}
          onChange={(value) => updateFilter("city", value)}
        />
      </div>
      {/* Registered In Filter */}
      <div className="space-y-2">
        <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white mb-2 font-display">
          Registered In
        </label>
        <LocationDropdown
          value={filters.registeredIn}
          options={CITIES}
          onChange={(value) => updateFilter("registeredIn", value)}
        />
      </div>

      {/* Range Filters */}
      {[
        {
          key: "price",
          label: "Price",
          icon: <PriceFilterIcon />,
          minKey: "priceMin" as keyof FilterState,
          maxKey: "priceMax" as keyof FilterState,
          min: 0,
          max: 300000,
          step: 10000,
          formatMin: (val: number) => `PKR ${val / 1000}k`,
          formatMax: (val: number) => `${val / 1000}k`,
          showPlus: true,
          calculateLeft: (min: number) => (min / 300000) * 100,
          calculateWidth: (min: number, max: number) => ((max - min) / 300000) * 100,
        },
        {
          key: "year",
          label: "Years",
          icon: <CalendarIcon className="w-8 h-8" />,
          minKey: "yearMin" as keyof FilterState,
          maxKey: "yearMax" as keyof FilterState,
          min: 2006,
          max: 2024,
          step: 1,
          formatMin: (val: number) => val.toString(),
          formatMax: (val: number) => val.toString(),
          showPlus: false,
          calculateLeft: (min: number) => ((min - 2006) / (2024 - 2006)) * 100,
          calculateWidth: (min: number, max: number) => ((max - min) / (2024 - 2006)) * 100,
        },
        {
          key: "mileage",
          label: "Mileage",
          icon: <MilageFilterIcon />,
          minKey: "mileageMin" as keyof FilterState,
          maxKey: "mileageMax" as keyof FilterState,
          min: 0,
          max: 300000,
          step: 10000,
          formatMin: (val: number) => `KM ${val / 1000}k`,
          formatMax: (val: number) => `${val / 1000}k`,
          showPlus: true,
          calculateLeft: (min: number) => (min / 300000) * 100,
          calculateWidth: (min: number, max: number) => ((max - min) / 300000) * 100,
        },
      ].map((rangeFilter) => {
        const minValue = filters[rangeFilter.minKey] as number;
        const maxValue = filters[rangeFilter.maxKey] as number;

        return (
          <div key={rangeFilter.key} className="space-y-2">
            <div className="flex items-center gap-2 mb-2 justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0">
                  {rangeFilter.icon}
                </div>
                <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white  font-display">
                  {rangeFilter.label}
                </label>
              </div>
              <div className="flex items-center justify-between text-[#0000008C] dark:text-white text-sm">
                <span>{rangeFilter.formatMin(minValue)} - {rangeFilter.formatMax(maxValue)}{rangeFilter.showPlus ? '+' : ''}</span>
              </div>
            </div>
            <div className="space-y-2">

              <div className="relative h-2">
                <div className="absolute w-full h-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div
                  className="absolute h-2 bg-[#A5A5A5] rounded"
                  style={{
                    left: `${rangeFilter.calculateLeft(minValue)}%`,
                    width: `${rangeFilter.calculateWidth(minValue, maxValue)}%`,
                  }}
                ></div>
                <input
                  type="range"
                  min={rangeFilter.min}
                  max={rangeFilter.max}
                  step={rangeFilter.step}
                  value={minValue}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val <= maxValue) {
                      updateFilter(rangeFilter.minKey, val);
                    }
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                  style={{
                    background: "transparent",
                  }}
                />
                <input
                  type="range"
                  min={rangeFilter.min}
                  max={rangeFilter.max}
                  step={rangeFilter.step}
                  value={maxValue}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= minValue) {
                      updateFilter(rangeFilter.maxKey, val);
                    }
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                  style={{
                    background: "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Body Types */}
      <div className="space-y-2 py-10 border-y">
        <div className="flex items-center gap-2 mb-2">
          <div className="">
            <BodyTypeFilterIcon />
          </div>
          <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white mb-2  font-mulish">
            Body types
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2 ml-10">
          {BODY_TYPES.map((type) => (
            <Button
              key={type.name}
              type="button"
              variant="ghost"
              className={cn(
                "!px-0  hover:border-customRed transition-colors text-[#0000008C] dark:text-white text-center flex flex-col items-center justify-center h-auto",
                filters.modelCategory === type.name && "border-customRed"
              )}
              onClick={() => updateFilter("modelCategory", type.name)}
            >
              <div className="mb-1 flex justify-center">
                {type.icon}
              </div>
              <div className="text-xs text-[#A5A5A5] font-mulish">{type.name}</div>
            </Button>
          ))}
        </div>
      </div>

      {/* Model Category */}
      <div className="space-y-2">
        <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white mb-2 font-display">
          Model Category
        </label>
        <LocationDropdown
          value={filters.modelCategory}
          options={BODY_TYPES.map((type) => type.name)}
          onChange={(value) => updateFilter("modelCategory", value)}
        />
      </div>

      {/* Specifications */}
      <div className="space-y-2">
        <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white mb-5  font-display">
          Specifications
        </label>
        <div className="flex flex-wrap gap-2">
          {SPECIFICATIONS.map((spec) => (
            <Button
              key={spec}
              type="button"
              variant="ghost"
              onClick={() => toggleSpecification(spec)}
              className={cn(
                "px-3 py-2 text-xs uppercase font-display border-2 transition-colors",
                filters.specifications.includes(spec)
                  ? "bg-customRed border-customRed text-white hover:bg-customRed/50"
                  : "bg-white border-[#0000004D] text-[#0000008C] dark:bg-transparent dark:border-[#FFFFFF4D] dark:text-[#FFFFFF4D] hover:border-customRed"
              )}
            >
              {spec}
            </Button>
          ))}
        </div>
      </div>

      {/* Transmission Type */}
      <div className="space-y-2">
        <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white mb-2  font-display">
          Transmission type
        </label>
        <LocationDropdown
          value={filters.transmissionType}
          options={TRANSMISSION_TYPES}
          onChange={(value) => updateFilter("transmissionType", value)}
        />
      </div>

      {/* Number of Seats */}
      <div className="space-y-2">
        <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white mb-2  font-display">
          Number of seats
        </label>
        <LocationDropdown
          value={filters.numberOfSeats}
          options={NUMBER_OF_SEATS}
          onChange={(value) => updateFilter("numberOfSeats", value)}
        />
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <label className="block text-sm sm:text-lg font-semibold text-black dark:text-white mb-2  font-display">
          Colors
        </label>
        <LocationDropdown
          value={filters.color}
          options={COLORS}
          onChange={(value) => updateFilter("color", value)}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;

