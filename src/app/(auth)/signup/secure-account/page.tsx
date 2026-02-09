"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useState, useEffect } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { secureAccountSchema, type SecureAccountFormData } from "@/validations/schema";
import { registerUser } from "@/store/thunks/authThunks";
import type { AppDispatch } from "@/store";
import type { SignupFormData } from "@/validations/schema";

export default function SecureAccountPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SecureAccountFormData>({
    resolver: zodResolver(secureAccountSchema),
  });

  useEffect(() => {
    // Check if signup data exists, if not redirect back to signup
    if (typeof window !== "undefined") {
      const signupData = sessionStorage.getItem("signupData");
      if (!signupData) {
        router.push("/signup");
      }
    }
  }, [router]);

  const onSubmit = async (data: SecureAccountFormData) => {
    try {
      setError("");
      
      // Retrieve signup data from sessionStorage
      if (typeof window === "undefined") {
        setError("Unable to access stored data. Please try again.");
        return;
      }

      const signupDataStr = sessionStorage.getItem("signupData");
      if (!signupDataStr) {
        setError("Signup data not found. Please start over.");
        router.push("/signup");
        return;
      }

      const signupData: SignupFormData = JSON.parse(signupDataStr);

      // Combine data from both steps
      const registrationData = {
        email: signupData.email,
        phone: signupData.phoneNumber,
        password: data.password,
        username: data.username,
        fullName: signupData.fullName,
      };

      // Call register API
      const result = await dispatch(registerUser(registrationData));

      if (registerUser.fulfilled.match(result)) {
        // Registration successful, clear sessionStorage and redirect
        sessionStorage.removeItem("signupData");
        router.push("/signup/success");
      } else {
        // Registration failed
        setError(result.payload as string || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}
      <Input
        type="text"
        placeholder="USERNAME"
        {...register("username")}
        error={errors.username?.message}
      />
      <div className="relative">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="PASSWORD"
            {...register("password")}
            error={errors.password?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[18px] text-white transition z-10"
          >
            {showPassword ? <TbEye size={24} /> : <TbEyeOff size={24} />}
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="CONFIRM PASSWORD"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-[18px] text-white transition z-10"
          >
            {showConfirmPassword ? <TbEye size={24} /> : <TbEyeOff size={24} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        className="!mt-6 !font-display tracking-widest"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        CREATE ACCOUNT
      </Button>
    </form>
  );

  return (
    <AuthLayout
      headerText="Create Your Account "
      title="SECURE YOUR ACCOUNT"
      description="Please enter your login credentials to access your account"
      formContent={formContent}
      showSocialLogin={false}
    />
  );
}

