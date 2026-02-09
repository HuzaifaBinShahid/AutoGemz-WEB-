
"use client";

import React from "react";
import Image from "next/image";

interface HeroSection3StepProps {
  activeStep?: number;
}

const HeroSection3Step: React.FC<HeroSection3StepProps> = ({ activeStep = 1 }) => {
  const steps = [
    {
      icon: "/images/icons/Icon1.png",
      label: "Enter Your Car Information",
      step: 1,
    },
    {
      icon: "/images/icons/Icon2.png",
      label: "Upload Photos",
      step: 2,
    },
    {
      icon: "/images/icons/Icon3.png",
      label: "Enter Your Selling Price",
      step: 3,
    },
  ];

  return (
    <section className="w-full pt-6 md:pt-24  pb-6">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <h1 className="md:text-[36px] text-[36px] font-display font-semibold text-black dark:text-white uppercase md:tracking-wide">
            SELL YOUR CAR WITH 3 EASY & SIMPLE STEPS!
          </h1>
          <p className="text-sm md:text-base text-neutral-600 font-mulish dark:text-neutral-400 !mt-2">
            It&apos;s free and takes less than a minute.
          </p>

          {/* Step Indicators */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-12 mt-12">
            {steps.map((step, index) => {
              const isActive = activeStep === step.step;
              return (
                <div
                  key={index}
                  className="flex md:flex-col flex-row items-center ml-[16%] md:ml-0 gap-3"
                >
                  <div
                    className={` rounded-full flex items-center justify-center  transition-all ${
                      isActive
                        ? "border-customRed bg-customRed/10 dark:bg-customRed/10"
                        : "border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/50"
                    }`}
                  >
                    <Image
                      src={step.icon}
                      alt={step.label}
                      width={32}
                      height={32}
                      className={`w-8 h-8 md:w-10 md:h-10 object-contain ${
                        isActive 
                          ? "opacity-100" 
                          : "opacity-60"
                      }`}
                    />
                  </div>
                  <span className="text-xs md:text-sm font-mulish font-medium text-black dark:text-white text-center ">
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection3Step;

