"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { signupSchema, type SignupFormData } from "@/validations/schema";
import type { RootState } from "@/store";

export default function SignupPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Don't render signup form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const onSubmit = async (data: SignupFormData) => {
    try {
      console.log("Signup Data=========:", data);
      // Store data in sessionStorage for next step
      if (typeof window !== "undefined") {
        sessionStorage.setItem("signupData", JSON.stringify(data));
      }
      router.push("/signup/secure-account");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Input
        type="text"
        placeholder="FULL NAME"
        {...register("fullName")}
        error={errors.fullName?.message}
      />
      <Input
        type="tel"
        placeholder="PHONE NUMBER"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />
      <Input
        type="email"
        placeholder="EMAIL"
        {...register("email")}
        error={errors.email?.message}
      />

      <Button
        type="submit"
        variant="default"
        className="!mt-6 !font-display tracking-widest"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        NEXT
      </Button>
    </form>
  );

  return (
    <AuthLayout
      headerText="Create Your Account"
      title="SIGNUP"
      description="Please enter your login credentials to access your account"
      formContent={formContent}
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/login"
      showSocialLogin={false}
    />
  );
}
