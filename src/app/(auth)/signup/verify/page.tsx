"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import VerificationCodeInput from "@/components/common/VerificationCodeInput";
import Button from "@/components/common/Button";

export default function SignupVerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(85);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeComplete = async (verificationCode: string) => {
    setError("");
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate verification
      if (verificationCode.length === 6) {
        router.push("/signup/deposit");
      } else {
        setError("Invalid verification code");
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    setCountdown(85);
    setCanResend(false);
    setCode("");
    setError("");
    // Mock resend logic
    console.log("Resending verification code...");
  };

  const handleVerify = () => {
    if (code.length === 6) {
      handleCodeComplete(code);
    } else {
      setError("Please enter the complete verification code");
    }
  };

  const formContent = (
    <div className="space-y-6">
      <VerificationCodeInput
        length={6}
        onChange={(verificationCode) => {
          setCode(verificationCode);
        }}
        onComplete={(verificationCode) => {
          // Auto-verify when code is complete
          handleCodeComplete(verificationCode);
        }}
        error={error}
      />

      <div className="mb-6">
        {canResend ? (
          <Button
            type="button"
            variant="link"
            size="md"
            onClick={handleResend}
            className="font-mulish"
          >
            Resend code
          </Button>
        ) : (
          <p className="text-[#FFFFFFB2] text-sm font-normal font-mulish">
            Resend code in {countdown} sec
          </p>
        )}
      </div>

      <Button
        type="button"
        variant="default"
        className="mt-8 !font-display tracking-widest"
        onClick={handleVerify}
        isLoading={isSubmitting}
        disabled={isSubmitting || code.length !== 6}
      >
        VERIFY & NEXT
      </Button>
    </div>
  );

  return (
    <AuthLayout
      headerText="VERIFY YOUR ACCOUNT"
      title="VERIFY YOUR ACCOUNT"
      description="We've sent the code to the email on your device"
      formContent={formContent}
      showSocialLogin={false}
    />
  );
}

