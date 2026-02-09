"use client";

import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import AuthCard from "@/components/auth/AuthCard";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Link from "next/link";

import type { ForgotPasswordFormData } from "@/interfaces";

interface ForgotPasswordFormProps {
  register: UseFormRegister<ForgotPasswordFormData>;
  handleSubmit: UseFormHandleSubmit<ForgotPasswordFormData>;
  errors: FieldErrors<ForgotPasswordFormData>;
  isSubmitting: boolean;
}

export default function ForgotPasswordForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
}: ForgotPasswordFormProps) {
  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <div className="space-y-6">
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          leftIcon="mail"
          placeholder="you@example.com"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Send reset link
        </Button>
        <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}

