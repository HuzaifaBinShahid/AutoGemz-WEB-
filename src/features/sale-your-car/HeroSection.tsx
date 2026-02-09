"use client";

import React from "react";
import TransparencyIcon from "@/assets/svg/TransparencyIcon";
import EffeciencyIcon from "@/assets/svg/EffeciencyIcon";
import TrustwirthyIcon from "@/assets/svg/TrustwirthyIcon";

const HeroSection: React.FC = () => {
  const features = [
    {
      icon: TransparencyIcon,
      label: "Transparency",
      description: "Clear and honest pricing",
    },
    {
      icon: EffeciencyIcon,
      label: "Efficiency",
      description: "Fast and streamlined process",
    },
    {
      icon: TrustwirthyIcon,
      label: "Trustworthiness",
      description: "Secure and reliable service",
    },
  ];

  return (
    <section className="w-full pt-16 md:pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <h1 className="md:text-[36px] text-[24px] font-display font-semibold text-black dark:text-white uppercase tracking-wide">
            SELL SMARTER WITH AN INSTANT OFFER
          </h1>
          <p className="text-sm md:text-base text-neutral-600 font-mulish dark:text-neutral-400 !mt-2">
            It&apos;s free and takes less than a minute.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-[9px]"
                >
                  <div className="">
                    <IconComponent />
                  </div>
                  <span className="text-sm md:text-[15px] font-mulish font-light text-black dark:text-white  tracking-wide">
                    {feature.label}
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

export default HeroSection;

