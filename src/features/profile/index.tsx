"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import type { ProfileFormData } from "@/interfaces";

interface ProfileProps {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  isSubmitting: boolean;
}

export default function Profile({
  register,
  errors,
  isSubmitting,
}: ProfileProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-8">
        Profile Settings
      </h1>
      <form className="space-y-6">
        <Input
          label="Name"
          {...register("name")}
          error={errors.name?.message}
          leftIcon="user"
        />
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          leftIcon="mail"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}

