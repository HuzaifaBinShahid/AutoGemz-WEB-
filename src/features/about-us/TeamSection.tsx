"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TEAM_MEMBERS } from "@/constants/constants";
import GlassmorphismWrapper from "@/components/common/GlassmorphismWrapper";

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const membersPerView = 4;

  const totalSlides = Math.ceil(TEAM_MEMBERS.length / membersPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev + 1 >= totalSlides) return 0;
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev - 1 < 0) return totalSlides - 1;
      return prev - 1;
    });
  };

  const getVisibleMembers = () => {
    const start = currentIndex * membersPerView;
    return TEAM_MEMBERS.slice(start, start + membersPerView);
  };

  return (
    <section className="  lg:py-24">
      <div className="2xl:container 2xl:mx-auto  px-4 2xl:px-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl lg:text-[56px] font-semibold text-black dark:text-white uppercase font-display leading-[100%] tracking-normal align-middle">
            OUR DEDICATED TEAM OF EXPERTS
          </h2>

          {/* Navigation Arrows - Hidden on mobile */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center bg-white dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200 border border-neutral-300 dark:border-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous team members"
              disabled={totalSlides <= 1}
            >
              <FiChevronLeft className="w-5 h-5 text-black dark:text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center bg-white dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200 border border-neutral-300 dark:border-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next team members"
              disabled={totalSlides <= 1}
            >
              <FiChevronRight className="w-5 h-5 text-black dark:text-white" />
            </button>
          </div>
        </div>

        {/* Team Members - Horizontal scroll on mobile, grid on desktop */}
        <div className="md:grid md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:gap-6">
          {/* Mobile: Horizontal scrollable container */}
          <div className="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="flex-shrink-0 w-[85vw] snap-start">
                <GlassmorphismWrapper className="!p-0">
                  <div>
                    {/* Image */}
                    <div className="relative h-[400px] bg-gray-200 dark:bg-neutral-900">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-6 bg-white dark:bg-black">
                      <h3 className="text-xl font-bold text-black dark:text-white uppercase font-display mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-black dark:text-white uppercase tracking-wide font-semibold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </GlassmorphismWrapper>
              </div>
            ))}
          </div>
          
          {/* Desktop: Grid with pagination */}
          <div className="hidden md:contents transition-all duration-500 ease-in-out">
            {getVisibleMembers().map((member) => (
              <GlassmorphismWrapper key={member.id} className="!p-0">
                <div>
                  {/* Image */}
                  <div className="relative h-[400px] bg-gray-200 dark:bg-neutral-900">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6 bg-white dark:bg-black">
                    <h3 className="text-xl font-bold text-black dark:text-white uppercase font-display mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-black dark:text-white uppercase tracking-wide font-semibold">
                      {member.role}
                    </p>
                  </div>
                </div>
              </GlassmorphismWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

