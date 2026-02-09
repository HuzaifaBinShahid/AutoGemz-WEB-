"use client";

import React from "react";
import Image from "next/image";

interface JoinAuctionCardProps {
  className?: string;
  badgeNumber?: string;
  title?: string;
  tagline?: string;
  backgroundImage?: string;
}

const JoinAuctionCard = ({
  className = "",
  badgeNumber = "01",
  title = "JOIN THE AUCTION",
  tagline = "Sign up quickly to start bidding or selling your car",
  backgroundImage = "/images/home/1st.png",
}: JoinAuctionCardProps) => {
  return (
    <div className={`relative w-full lg:h-[302px] md:h-[250px] h-[150px] overflow-hidden ${className}`}>

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(245.38deg, rgba(255, 77, 36, 0.3) 0%, rgba(255, 77, 36, 0) 40%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 h-full flex flex-col justify-center  px-4 ">
        {/* Badge and Lines Section */}
        <div className="absolute top-8 lg:top-12 left-4 md:left-8 right-4 md:right-8 flex items-center gap-4">
          {/* Red Badge */}
          <div className="relative flex-shrink-0 z-10">
            <div className="w-[23px] h-[23px] md:w-[48px] md:h-[48px]  rounded-full bg-[#DC3729]  flex items-center justify-center">
              <span className="text-white font-display font-semibold text-xs md:text-lg ">
                {badgeNumber}
              </span>
            </div>
          </div>

          {/* Horizontal Lines */}


          <div className="h-[1px] w-full bg-white/10"></div>

        </div>

        {/* Main Content */}
        <div className=" lg:mt-16 xl:mt-20 mt-[18px]">
          {/* Main Title */}
          <h2 className="text-white font-display font-semibold text-2xl md:text-[40px] lg:text-[30px] xl:text-[56px] uppercase tracking-wide  md:mb-6">
            {title}
          </h2>

          {/* Tagline */}
          <p className="text-white font-mulish font-normal text-xs md:text-lg lg:text-xl max-w-2xl mx-auto">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinAuctionCard;

