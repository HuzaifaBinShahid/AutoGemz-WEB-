"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/common/Button";
import SuccessIcon from "@/assets/svg/TickIcon";

export default function PasswordSuccessPage() {
  const formContent = (
    <div className="space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-[#FFFFFF0D] border border-[#FFFFFF2E] rounded-full flex items-center justify-center">
          <SuccessIcon />
        </div>
      </div>

      {/* Button */}
      <Button
        href="/login"
        variant="default"
        className="!font-display font-normal tracking-widest"
      >
        BACK TO LOGIN
      </Button>
    </div>
  );

  return (
    <AuthLayout
      headerText="WELCOME BACK"
      title="PASSWORD CHANGED!"
      description="Your password has been changed successfully."
      formContent={formContent}
      showSocialLogin={false}
    />
  );
}
