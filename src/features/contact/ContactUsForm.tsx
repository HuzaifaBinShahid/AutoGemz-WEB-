"use client";

import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import type { ContactFormData } from "@/interfaces";

interface ContactUsFormProps {
  register: UseFormRegister<ContactFormData>;
  handleSubmit: UseFormHandleSubmit<ContactFormData>;
  errors: FieldErrors<ContactFormData>;
  isSubmitting: boolean;
  onSubmit: (data: ContactFormData) => void;
  submitError?: string | null;
  submitSuccess?: boolean;
}

export default function ContactUsForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  submitError,
  submitSuccess,
}: ContactUsFormProps) {
  return (
    <>
      {submitSuccess && (
        <div className="mb-6 rounded-lg border border-[#FFFFFF2E] bg-[#FFFFFF0D] p-4">
          <p className="text-sm text-white">
            Your message has been sent successfully! We&apos;ll get back to you soon.
          </p>
        </div>
      )}

      {submitError && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">
            {submitError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="NAME"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            type="email"
            placeholder="EMAIL"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <Input
          type="tel"
          placeholder="PHONE"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Button 
          type="submit" 
          variant="default" 
          className="!font-display !font-normal uppercase tracking-widest mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "SUBMITTING..." : "LET'S GET STARTED!"}
        </Button>
      </form>
    </>
  );
}

