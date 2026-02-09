import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
});

export const secureAccountSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const depositSchema = z.object({
  cardType: z.string().min(1, "Please select a card type"),
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Type exports
export type SignupFormData = z.infer<typeof signupSchema>;
export type SecureAccountFormData = z.infer<typeof secureAccountSchema>;
export type DepositFormData = z.infer<typeof depositSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

