"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/common/Button";
import SuccessIcon from "@/assets/svg/TickIcon";

export default function SignupSuccessPage() {
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
        className="!font-display !font-normal uppercase tracking-widest"
      >
        Back to Dashboard
      </Button>
    </div>
  );

  return (
    <AuthLayout
      headerText="ACCOUNT CREATED"
      title="ACCOUNT CREATED"
      description="Your account has been created successfully."
      formContent={formContent}
      showSocialLogin={false}
    />
  );
}

