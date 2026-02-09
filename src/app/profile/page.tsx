"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "@/store";
import { updateUser } from "@/store/slices/authSlice";
import Profile from "@/features/profile";
import ProtectedRoute from "@/components/common/ProtectedRoute";

import { profileSchema } from "@/validations/schema";
import { ProfileFormData } from "@/interfaces";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      dispatch(updateUser(data));
      // API call logic here
      // await api.patch("/user/profile", data);
      console.log("Update profile:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ProtectedRoute>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Profile
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </form>
    </ProtectedRoute>
  );
}

