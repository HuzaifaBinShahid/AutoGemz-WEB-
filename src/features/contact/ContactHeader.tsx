"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactUsForm from "@/features/contact/ContactUsForm";
import type { ContactFormData } from "@/interfaces";
import AuthLayout from "@/components/layout/AuthLayout";
import { contactSchema } from "@/validations/schema";

// Simulate API call
const submitContactForm = async (data: ContactFormData): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate random errors (15% chance)
  if (Math.random() < 0.15) {
    throw new Error("Failed to send message. Please check your connection and try again.");
  }

  // In a real app, this would be an API call
  console.log("Contact form data:", data);
};

export default function ContactHeader() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitContactForm(data);
      setSubmitSuccess(true);
      reset();

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const formContent = (
    <ContactUsForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      submitError={submitError}
      submitSuccess={submitSuccess}
    />
  );

  return (
    <AuthLayout
      headerText="CONTACT OUR FRIENDLY SUPPORT TEAM NOW!"
      title="CONTACT US!"
      description="Schedule your service appointment today to ensure your vehicle receives top-notch care from our expert technicians. Don't wait - keep your car running smoothly with a quick and easy booking."
      formContent={formContent}
      showSocialLogin={false}
      backgroundImage="/images/ContactUsImage.jpg"
      titleClassName="lg:text-[50px] small:!text-[40px]  xxs:!text-[35px] "
      descriptionClassName="!text-left !text-white !mt-1 "
    />
  );
}

