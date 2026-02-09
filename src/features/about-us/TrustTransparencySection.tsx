import React from "react";
import Image from "next/image";
import { TRUST_FEATURES } from "@/constants/constants";
import CarMobileIcon from "@/assets/svg/CarMobileIcon";

const TrustTransparencySection = () => {
  return (
    <section className=" py-16 lg:py-[60px]">
      <div className="2xl:container 2xl:mx-auto xl:pl-10 px-4 2xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            {/* Small label */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-red-600 dark:bg-red-700"></div>
              <p className="text-black dark:text-white uppercase font-display font-light md:text-lg text-sm leading-[22px] tracking-[1.4px] align-middle">
                FULL-SERVICE MAINTENANCE TO KEEP YOUR CAR
              </p>
            </div>

            {/* Main heading */}
            <h2 className="text-black dark:text-white uppercase font-display font-semibold text-[24px] md:text-4xl lg:text-5xl xl:text-[56px] leading-none tracking-[1.68px] align-middle">
              DRIVEN BY TRUST & TRANSPARENCY
            </h2>

            {/* Description */}
            <p className="text-black dark:text-white font-mulish font-light lg:text-base md:text-sm text-xs  leading-6 xl:max-w-[580px] 2xl:max-w-auto">
              To make car buying, selling, and importing simple, transparent, and accessible for everyone.
            </p>

            {/* Features List */}
            <ul className="space-y-5 mt-8 lg:max-w-[470px] ">
              {TRUST_FEATURES.map((feature, index) => (
                <div key={index} className="border border-[#FFFFFF1A]">
                <li className="flex items-center gap-4 bg-white dark:bg-transparent  md:py-5 py-1 pr-5 border-l-4 border-customRed">
                  {/* <div className="w-1 h-12 bg-red-600 dark:bg-red-700 flex-shrink-0"></div> */}
                  <div className="flex-shrink-0 ml-2">
                    <CarMobileIcon />
                  </div>
                  <p className="text-black dark:text-white uppercase font-display font-normal md:text-sm text-xs leading-[20px] md:leading-[40px] tracking-[1px] align-middle">
                    {feature.title}
                  </p>
                </li>

                </div>
              ))}
            </ul>
          </div>

          {/* Right side - Image */}
          <div className="relative h-[400px] lg:h-[815px]  overflow-hidden bg-gray-200 dark:bg-gray-700">
            <Image
              src="/images/about/aboutimage1.jpg"
              alt="Orange sports car"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(221.12deg, rgba(220, 55, 41, 0.75) 3%, rgba(0, 0, 0, 0.08) 27%, rgba(0, 0, 0, 0.08) 74%, rgba(203, 61, 29, 0.55) 90.59%, rgba(220, 55, 41, 0.5) 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustTransparencySection;

