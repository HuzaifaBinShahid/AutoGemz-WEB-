import React from "react";
import Link from "next/link";

const AboutUsHeader = () => {
  return (
    <div className="relative w-full min-h-[600px] bg-cover bg-center flex items-end pb-12 md:pb-16 lg:pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/AuthImage.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/20 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 2xl:px-8  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          {/* Left side - Main Headline */}
          <div className="space-y-6">
            {/* Small label with red line */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-red-600 dark:bg-red-700"></div>
              <p className="text-sm text-white uppercase tracking-wide font-semibold">
                COMMITMENT TO QUALITY AND INNOVATION IN EVERY SERVICE
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase font-display leading-tight">
              DISCOVER OUR CAR JOURNEY
            </h1>
          </div>

          {/* Right side - Introductory Text and Buttons */}
          <div className="lg:pl-8 space-y-6">
            <p className="text-base md:text-lg text-white leading-relaxed">
              Welcome! Our values are rooted in trust, integrity, and a relentless pursuit of excellence. We are not just a service provider; we are your automotive partners, committed to ensuring your vehicle&apos;s performance and longevity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="px-6 py-3 border-2 border-red-600 dark:border-red-700 text-white bg-transparent hover:bg-red-600 dark:hover:bg-red-700 hover:text-white transition-colors duration-200 uppercase font-semibold text-sm tracking-wide text-center"
              >
                BEST SERVICES
              </Link>
              <Link
                href="/auction"
                className="px-6 py-3 bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200 uppercase font-semibold text-sm tracking-wide text-center"
              >
                JOIN THE AUCTION
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHeader;

