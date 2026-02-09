"use client";

import React from "react";
import JoinAuctionCard from "./JoinAuctionCard";
import Button from "@/components/common/Button";
import { howItWorksSteps } from "@/constants/constants";
import Image from "next/image";

const HowItWorksSection = () => {
  return (
    <section className="relative">
      <div className="absolute top-64 left-0 w-[500px] h-96 pointer-events-none hidden lg:block">
        <Image
          src="/svgs/Group.svg"
          alt=""
          width={644}
          height={357}
          className="w-full h-auto opacity-70 transform "
        />
      </div>

      <div className="2xl:container 2xl:mx-auto px-4 2xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="relative flex flex-col lg:min-h-[800px]">
            {/* Subtle gradient background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 77, 36, 0.15) 0%, rgba(255, 77, 36, 0) 60%)",
              }}
            />

            <div className="relative z-10 ">
              <div className="flex items-center gap-3 md:mb-10 mb-4">
                <div className="w-1 h-8 bg-customRed"></div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
                  HOW IT WORKS
                </p>
              </div>
              {/* Section Label */}


              {/* Main Heading */}
              <h2 className="text-black dark:text-white font-display font-semibold text-2xl md:text-[30px] xl:text-[56px] uppercase tracking-wide leading-tight md:mb-8">
                FROM CAR DETAILS TO LIVE AUCTION IN 4 STEPS
              </h2>
              <div className="md:flex w-full px-4 hidden">
                {/* Auction Car Button */}
                <Button
                  href="/sale-car"
                  variant="default"
                  className="w-auto px-8 py-4 text-base md:text-lg font-display font-semibold"
                >
                  AUCTION CAR
                </Button>
              </div>
            </div>
          </div>
          {/* Right Column - Step Cards */}
          <div className="flex flex-col gap-4 lg:gap-6">
            {howItWorksSteps.map((step) => (
              <JoinAuctionCard
                key={step.id}
                badgeNumber={step.badgeNumber}
                title={step.title}
                tagline={step.tagline}
                backgroundImage={step.backgroundImage}
                className=""
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full px-4 md:hidden mt-5">
                {/* Auction Car Button */}
                <Button
                  href="/sale-car"
                  variant="default"
                  className=" px-8 py-4 text-base md:text-lg font-display font-semibold w-full"
                >
                  AUCTION CAR
                </Button>
              </div>
    </section>
  );
};

export default HowItWorksSection;
