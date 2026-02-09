"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TESTIMONIALS } from "@/constants/constants";
import QuoteIcon from "@/assets/svg/QuoteIcon";
import StarIcon from "@/assets/svg/StarIcon";

const TrustedByCommunitySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [displayIndex, setDisplayIndex] = useState(0);

  const totalSlides = TESTIMONIALS.length;

  const nextSlide = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    const nextIndex = displayIndex + 1 >= totalSlides ? 0 : displayIndex + 1;
    setCurrentIndex(nextIndex);
    setTimeout(() => {
      setDisplayIndex(nextIndex);
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    const prevIndex = displayIndex - 1 < 0 ? totalSlides - 1 : displayIndex - 1;
    setCurrentIndex(prevIndex);
    setTimeout(() => {
      setDisplayIndex(prevIndex);
      setIsAnimating(false);
    }, 500);
  };

  const getCurrentTestimonial = () => {
    return TESTIMONIALS[displayIndex];
  };

  const getNextTestimonial = () => {
    const nextIndex = displayIndex + 1 >= totalSlides ? 0 : displayIndex + 1;
    return TESTIMONIALS[nextIndex];
  };

  const getPrevTestimonial = () => {
    const prevIndex = displayIndex - 1 < 0 ? totalSlides - 1 : displayIndex - 1;
    return TESTIMONIALS[prevIndex];
  };

  const getAnimatingTestimonial = () => {
    return TESTIMONIALS[currentIndex];
  };

  // Render testimonial card
  const renderTestimonialCard = (
    testimonial: typeof TESTIMONIALS[0],
    isActive: boolean,
    isNext: boolean
  ) => {
    if (isActive) {
      // Full size active card
      return (
        <div
          key={testimonial.id}
          className="bg-white dark:bg-neutral-900 p-4 md:p-6 lg:p-8 border border-neutral-200 dark:border-neutral-800 dark:border-[#FFFFFF1A] relative z-10 h-full w-full"
        >
          {/* Red line at top */}
          <div
            className="absolute top-0 right-4 md:right-10 h-[2px] w-[150px] md:w-[250px] lg:w-[300px]"
            style={{
              background: "linear-gradient(90deg, rgba(234, 67, 53, 0) 0%, #EA4335 52.12%, rgba(234, 67, 53, 0) 100%)",
            }}
          ></div>

          {/* Profile picture in top-right corner - slightly overlapping */}
          <div className="flex items-center gap-2 justify-between">
            {/* Quote Icon */}
            <div className="mb-4">
              <QuoteIcon className="" />
            </div>
            <div className="relative w-[50px] h-[50px] md:w-[70px] md:h-[70px]">
              <Image
                src={testimonial.avatar}
                alt={testimonial.author}
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>

          {/* Quote Text */}
          <p className="text-sm md:text-base lg:text-lg text-black dark:text-white mb-4 md:mb-6 leading-relaxed pr-4 md:pr-8 lg:pr-16">
            {testimonial.quote}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base font-semibold text-black dark:text-white">
              {testimonial.author}
            </p>
            <div className="flex items-center gap-1">
              <StarIcon />
            </div>
          </div>

          {/* Red line at bottom */}
          <div
            className="absolute bottom-0 left-4 md:left-10 h-[2px] w-[150px] md:w-[250px] lg:w-[300px]"
            style={{
              background: "linear-gradient(90deg, rgba(234, 67, 53, 0) 0%, #EA4335 52.12%, rgba(234, 67, 53, 0) 100%)",
            }}
          ></div>
        </div>
      );
    } else if (isNext) {
      // Next card - smaller, showing about 10% (peeking from right)
      return (
        <div
          key={testimonial.id}
          className="bg-white dark:bg-neutral-900 p-4 md:p-6 lg:p-8 border border-neutral-200 dark:border-neutral-800 dark:border-[#FFFFFF1A] transition-all duration-500 ease-in-out relative"
          style={{
            width: "100%",
            maxWidth: "512px",
            height: "100%",
            minHeight: "300px",
            transformOrigin: "left center",
            opacity: 0.65,
          }}
        >
          {/* Red line at top */}
          <div
            className="absolute top-0 left-0 h-[2px] md:h-[3px] w-[150px] md:w-[250px] lg:w-[300px]"
            style={{
              background: "linear-gradient(90deg, rgba(234, 67, 53, 0) 0%, #EA4335 52.12%, rgba(234, 67, 53, 0) 100%)",
            }}
          ></div>

          {/* Profile picture in top-right corner - slightly overlapping */}
          <div className="absolute -top-2 right-4 w-12 h-12 rounded-full overflow-hidden bg-neutral-300 dark:bg-neutral-700 z-10 border-2 border-white dark:border-neutral-900">
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              fill
              className="object-cover"
            />
          </div>

          {/* Quote Icon */}
          <div className="mb-4">
            <QuoteIcon className="fill-black dark:fill-white opacity-30" />
          </div>

          {/* Quote Text */}
          <p className="text-sm md:text-base lg:text-lg text-black dark:text-white mb-4 md:mb-6 leading-relaxed pr-4 md:pr-8 lg:pr-16">
            {testimonial.quote}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-black dark:text-white">
              {testimonial.author}
            </p>
            <div className="flex items-center gap-1">
              <StarIcon />
            </div>
          </div>

          {/* Red line at bottom */}
          <div
            className="absolute bottom-0 right-4 md:right-10 h-[2px] w-[150px] md:w-[250px] lg:w-[300px]"
            style={{
              background: "linear-gradient(90deg, rgba(234, 67, 53, 0) 0%, #EA4335 52.12%, rgba(234, 67, 53, 0) 100%)",
            }}
          ></div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-8 md:py-16">
      <div className="2xl:container 2xl:mx-auto xl:pl-10 px-4 2xl:px-8 relative">
        {/* Decorative Images - Hidden on mobile */}
        <div className="hidden lg:block absolute bottom-16 left-44 w-[127px] h-[74px] pointer-events-none">
          <Image
            src="/images/about/team/Rotate Image → Image Vector.png"
            alt=""
            width={100}
            height={100}
            className="w-full h-auto opacity-70"
            priority
          />
        </div>

        <div className="hidden lg:block absolute -bottom-32 left-0 w-96 h-96 pointer-events-none">
          <Image
            src="/images/about/team/BG Blur.png"
            alt=""
            width={644}
            height={357}
            className="w-full h-auto opacity-70 transform "
          />
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <div className="hidden md:flex gap-2 justify-end mb-6 lg:mb-0">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200 border border-neutral-300 dark:border-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonials"
            disabled={totalSlides <= 1}
          >
            <FiChevronLeft className="w-5 h-5 text-black dark:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200 border border-neutral-300 dark:border-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonials"
            disabled={totalSlides <= 1}
          >
            <FiChevronRight className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-8 lg:gap-12">
          {/* Left side - Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Small label */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 md:h-12 bg-red-600 dark:bg-red-700"></div>
              <p className="font-display font-light text-sm md:text-lg leading-[22px] tracking-normal uppercase align-middle text-red-600 dark:text-white">
                YOUR TRUST, OUR COMMITMENT
              </p>
            </div>

            {/* Main heading */}
            <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-[54px] leading-[100%] tracking-normal uppercase text-black dark:text-white">
              TRUSTED BY COMMUNITY
            </h2>
            <p className="text-sm md:text-base font-light text-black dark:text-[#FFFFFF99]">
              From seamless car bidding to transparent inspections and hassle-free imports, we&apos;ve helped thousands of buyers
 of buyers and sellers achieve their goals with confidence.
            </p>
          </div>

          {/* Right side - Testimonials with Navigation */}
          <div className="relative">
            {/* Mobile: Horizontal scrollable container */}
            <div className="md:hidden mt-10">
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
                {TESTIMONIALS.map((testimonial) => (
                  <div key={testimonial.id} className="flex-shrink-0 w-[85vw] snap-start">
                    <div className="relative bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 dark:border-[#FFFFFF1A] min-h-[300px]">
                      {/* Red line at top */}
                      <div
                        className="absolute top-0 right-4 h-[2px] w-[200px]"
                        style={{
                          background: "linear-gradient(90deg, rgba(234, 67, 53, 0) 0%, #EA4335 52.12%, rgba(234, 67, 53, 0) 100%)",
                        }}
                      ></div>

                      <div className="flex items-center gap-2 justify-between mb-4">
                        {/* Quote Icon */}
                        <div>
                          <QuoteIcon className="" />
                        </div>
                        <div className="relative w-[50px] h-[50px]">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      </div>

                      {/* Quote Text */}
                      <p className="text-sm text-black dark:text-white mb-4 leading-relaxed">
                        {testimonial.quote}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-black dark:text-white">
                          {testimonial.author}
                        </p>
                        <div className="flex items-center gap-1">
                          <StarIcon />
                        </div>
                      </div>

                      {/* Red line at bottom */}
                      <div
                        className="absolute bottom-0 left-4 h-[2px] w-[200px]"
                        style={{
                          background: "linear-gradient(90deg, rgba(234, 67, 53, 0) 0%, #EA4335 52.12%, rgba(234, 67, 53, 0) 100%)",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Testimonials Container with Animation */}
            <div className="hidden md:block relative mt-6 lg:mt-10 overflow-hidden h-[300px] lg:h-[340px]">
              <div className="relative w-full h-full flex items-center md:justify-start lg:justify-end gap-2 lg:gap-3">
                {/* Current active card (full size) - slides out */}
                {getCurrentTestimonial() && (
                  <div
                    className={`flex-shrink-0 w-full md:w-full lg:w-[512px] h-full relative z-10 transition-all duration-500 ease-in-out ${isAnimating
                      ? direction === "next"
                        ? "-translate-x-[calc(100%+12px)] opacity-0"
                        : "translate-x-[calc(100%+12px)] opacity-0"
                      : "translate-x-0 opacity-100"
                      }`}
                  >
                    {renderTestimonialCard(getCurrentTestimonial(), true, false)}
                  </div>
                )}

                {/* Previous card - slides in from left when clicking prev */}
                {totalSlides > 1 && isAnimating && direction === "prev" && (
                  <div
                    className="absolute right-0 md:left-0 lg:right-0 flex-shrink-0 w-full md:w-full lg:w-[512px] h-full z-10 transition-all duration-500 ease-in-out opacity-100"
                    style={{
                      transform: "translateX(0)",
                    }}
                  >
                    {renderTestimonialCard(getAnimatingTestimonial(), true, false)}
                  </div>
                )}

                {/* Next card preview - shows 10% on the right */}
                {totalSlides > 1 && getNextTestimonial() && (
                  <div
                    className={`hidden lg:block flex-shrink-0 h-full z-0 transition-all duration-500 ease-in-out pointer-events-none ${isAnimating && direction === "next"
                      ? "w-[512px] opacity-100 z-10"
                      : "w-[51.2px] opacity-65"
                      }`}
                  >
                    {renderTestimonialCard(
                      isAnimating && direction === "next"
                        ? getAnimatingTestimonial()
                        : getNextTestimonial(),
                      isAnimating && direction === "next",
                      !isAnimating || direction !== "next"
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByCommunitySection;

