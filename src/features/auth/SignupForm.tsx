"use client";

import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import AuthCard from "@/components/auth/AuthCard";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Link from "next/link";

import type { SignupFormData } from "@/interfaces";

interface SignupFormProps {
  register: UseFormRegister<SignupFormData>;
  handleSubmit: UseFormHandleSubmit<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  isSubmitting: boolean;
}

export default function SignupForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
}: SignupFormProps) {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up to get started with Pro UI Kit"
    >
      <div className="space-y-6">
        <Input
          label="Name"
          {...register("name")}
          error={errors.name?.message}
          leftIcon="user"
          placeholder="John Doe"
        />
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
        <Input
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          leftIcon="lock"
          placeholder="••••••••"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Sign up
        </Button>
        <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
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

