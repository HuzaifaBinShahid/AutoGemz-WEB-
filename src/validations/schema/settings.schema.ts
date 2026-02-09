import { z } from "zod";

export const settingsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name must be less than 100 characters"),
  gender: z.string().min(1, "Please select a gender"),
  dateOfBirth: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(1, "Please select a city"),
  email: z.string().email("Invalid email address").optional(),
  username: z.string().optional(),
  mobileNumber: z.string().optional(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

