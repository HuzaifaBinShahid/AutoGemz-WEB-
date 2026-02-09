"use client";

import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/common/Button";
import type { RootState } from "@/store";

const JoinSection = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Hide the entire section if user is authenticated
  if (isAuthenticated) {
    return null;
  }

  const formContent = (
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
  );

  return (
    <AuthLayout
      className="!justify-center "
      GlassmorphismWrapperClassName="bg-transparent"
      showGridLines={false}
      title="JOIN PAKISTAN'S SMARTEST CAR AUCTION PLATFORM"
      description=""
      formContent={formContent}
      showSocialLogin={false}
      backgroundImage="/images/AuthImage.jpg"
      fullHeight={false}
      titleClassName="lg:text-[50px] md:!text-[30px] !text-[20px] !text-center md:!text-left  !leading-[40px] md:leading-[50px] "

    />
  );
};

export default JoinSection;
