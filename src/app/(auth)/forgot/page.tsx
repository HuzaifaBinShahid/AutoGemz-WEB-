"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch } from "@/store";
import { forgotPassword } from "@/store/thunks/authThunks";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/validations/schema";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const result = await dispatch(forgotPassword({ email: data.email }));
      
      if (forgotPassword.fulfilled.match(result)) {
        toast.success(result.payload.message || "Password reset email sent successfully!");
        router.push("/verify");
      } else {
        const errorMessage = result.payload || "Failed to send password reset email";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to send password reset email");
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
        <Input
          type="email"
          placeholder="EMAIL"
          {...register("email")}
          error={errors.email?.message}
        />
   

      <Button
        type="submit"
        variant="default"
        className=" !font-display !font-medium uppercase tracking-widest"
        isLoading={isSubmitting}
        disabled={isSubmitting}
       
      >
       RESET PASSWORD
      </Button>
    </form>
  );

  return (
    <AuthLayout
      headerText="WELCOME BACK"
      title="FORGOT PASSWORD"
      description="Remembers & input your email "
      formContent={formContent}
     showSocialLogin={false}
    />
  );
}
