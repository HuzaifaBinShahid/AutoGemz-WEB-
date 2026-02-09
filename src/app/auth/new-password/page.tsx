"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { newPasswordSchema, type NewPasswordFormData } from "@/validations/schema";

export default function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    try {
      // Mock API call
      console.log("Reset password with token:", token);
      router.push("/auth/password-success");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        className=" !font-display !font-medium uppercase tracking-widest"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
       CONFIRM
      </Button>
    </form>
  );

  return (
    <AuthLayout
      headerText="WELCOME BACK"
      title="CREATE NEW PASSWORD"
      description="Use a new password you haven’t used before."
      formContent={formContent}
   
      showSocialLogin={false}
    />
  );
}

