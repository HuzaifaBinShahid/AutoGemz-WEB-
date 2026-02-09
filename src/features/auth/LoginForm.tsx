"use client";

import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import AuthCard from "@/components/auth/AuthCard";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Link from "next/link";

import type { LoginFormData } from "@/interfaces";

interface LoginFormProps {
  register: UseFormRegister<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isSubmitting: boolean;
}

export default function LoginForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
}: LoginFormProps) {
  return (
    <AuthCard
      title="Sign in to your account"
      subtitle="Enter your credentials to access your account"
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
        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          leftIcon="lock"
          placeholder="••••••••"
        />
        <div className="flex items-center justify-between">
          <Link
            href="/forgot"
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Sign in
        </Button>
        <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}

