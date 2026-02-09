"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { depositSchema, type DepositFormData } from "@/validations/schema";

export default function DepositPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
  });

  const onSubmit = async (data: DepositFormData) => {
    try {
      // Process deposit
      console.log("Deposit data:", data);
      router.push("/signup/success");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSkip = () => {
    router.push("/signup/success");
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Input
        type="text"
        placeholder="VISA/MASTERCARD"
        {...register("cardType")}
        error={errors.cardType?.message}
      />
      <Input
        type="text"
        placeholder="CARD NUMBER"
        {...register("cardNumber", {
          onChange: (e) => {
            e.target.value = formatCardNumber(e.target.value);
          },
        })}
        error={errors.cardNumber?.message}
        maxLength={19}
      />
      <Input
        type="text"
        placeholder="EXPIRY"
        {...register("expiry", {
          onChange: (e) => {
            e.target.value = formatExpiry(e.target.value);
          },
        })}
        error={errors.expiry?.message}
        maxLength={5}
      />
      <Input
        type="text"
        placeholder="CVV"
        {...register("cvv")}
        error={errors.cvv?.message}
        maxLength={4}
      />

      <div className="flex gap-4 !mt-6">
        <Button
          type="button"
          variant="default"
          className="!font-display !font-normal uppercase tracking-widest"
          onClick={handleSkip}
        >
          SKIP FOR NOW
        </Button>
        <Button
          type="submit"
          variant="default"
          className="!font-display !font-normal uppercase tracking-widest"

          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          DEPOSIT & CONTINUE
        </Button>
      </div>
    </form>
  );

  return (
    <AuthLayout
      headerText="MAKE FIRST DEPOSIT"
      title="MAKE FIRST DEPOSIT"
      description="Please enter your login credentials to access your account"
      formContent={formContent}
      showSocialLogin={false}
    />
  );
}

