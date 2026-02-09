"use client";

import React from "react";
import Link from "next/link";
import CarCard from "@/components/common/CarCard";
import { CarCardProps } from "@/components/common/CarCard";

interface RelatedCarsSectionProps {
  cars: CarCardProps[];
}

const RelatedCarsSection: React.FC<RelatedCarsSectionProps> = ({ cars }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between !mb-10">
        <h2 className="text-2xl lg:text-[56px] font-semibold uppercase font-display text-black dark:text-white">
          MORE CARS YOU&apos;LL BE INTERESTED IN
        </h2>
        <Link
          href="/used-cars"
          className="text-customRed hover:underline text-sm uppercase tracking-wide"
        >
          VIEW ALL CARS
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </div>
  );
};

export default RelatedCarsSection;

