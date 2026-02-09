"use client";

import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/common/Button";
import type { RootState } from "@/store";

const HomeHeader = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const formContent = (
    <div>
      <div className="grid grid-cols-3">
        {["Car Make", "Car Model", "Year", "Price", "Mileage", "Location"].map(
          (field, index) => (
            <div
              key={index}
              className="border border-[#FFFFFF1A] md:py-[18px] py-[13px] md:px-[20px] px-[20px] bg-[#FFFFFF0D] font-display md:text-base text-xs text-[#FFFFFF99]"
            >
              {field}
            </div>
          )
        )}
      </div>
      <div className="py-[18px]">
        <Button
          href="/login"
          variant="primary"
          className="w-full  py-[13.5px] font-display text-xl "
        >
          SEARCH AUCTION CAR
        </Button>
      </div>
      {/* Login/Signup Buttons - Only show when not authenticated */}
      {!isAuthenticated && (
        <div className="gap-3 flex">
          {/* LOG IN Button */}
          <Button href="/login" variant="auth" className="h-10 md:h-[62px]">
            LOG IN
          </Button>

          {/* SIGN UP Button */}
          <Button href="/signup" variant="auth" className="h-10 md:h-[62px]">
            SIGN UP
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <AuthLayout
        className="!justify-start "
        headerText="Your Car, Your Bid, Your Win."
        GlassmorphismWrapperClassName="bg-transparent"
        showGridLines={false}
        title="Pakistan’s First Car Auction Platform"
        description="Post your car in minutes, get real buyers, and close deals without paying commission."
        formContent={formContent}
        showSocialLogin={false}
        backgroundImage="/images/HeroImage.jpg"
        fullHeight={false}
        isShowHeaderCards={true}
        titleClassName="lg:text-[50px] md:!text-[30px] !text-[20px] !text-center md:!text-left  !leading-[40px] md:leading-[50px] "
      />
    </div>
  );
};

export default HomeHeader;
