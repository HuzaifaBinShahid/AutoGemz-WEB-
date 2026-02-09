"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { RootState, AppDispatch } from "@/store";
import { fetchUserProfile, updateUserProfileSettings } from "@/store/thunks/authThunks";

import Dropdown from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import FormInput from "@/components/common/FormInput";
import DatePicker from "@/components/common/DatePicker";
import { settingsSchema, type SettingsFormData } from "@/validations/schema/settings.schema";

const SettingsForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasLoadedRef = useRef(false);
  const [profileImage, setProfileImage] = useState<string>("https://i.pravatar.cc/150?u=user");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: "",
      country: "",
      city: "",
      // email: "",
      username: "",
      // mobileNumber: "",
    },
  });

  // Fetch user profile on mount and pre-fill form
  useEffect(() => {
    if (hasLoadedRef.current) return; // Prevent multiple calls
    
    const loadUserProfile = async () => {
      try {
        hasLoadedRef.current = true;
        setIsLoading(true);
        const result = await dispatch(fetchUserProfile());
        if (fetchUserProfile.fulfilled.match(result)) {
          const profileData = result.payload?.data || result.payload;
          
          // Set profile image if available
          if (profileData.avatar || profileData.profilePicture) {
            setProfileImage(profileData.avatar || profileData.profilePicture);
          } else if (user?.avatar) {
            setProfileImage(user.avatar);
          }
          
          // Format date of birth if it exists (convert from ISO string to date format)
          let formattedDateOfBirth = "";
          if (profileData.dateOfBirth) {
            try {
              const date = new Date(profileData.dateOfBirth);
              // Format as YYYY-MM-DD for date input
              formattedDateOfBirth = date.toISOString().split('T')[0];
            } catch (e) {
              formattedDateOfBirth = profileData.dateOfBirth;
            }
          }
          
          // Populate form with user data from API
          reset({
            fullName: profileData.fullName || profileData.name || user?.name || "",
            gender: profileData.gender || "",
            dateOfBirth: formattedDateOfBirth || profileData.dob || "",
            country: profileData.country || "",
            city: profileData.city || "",
            username: profileData.username || profileData.userName || "",
          });
        } else {
          // If fetch fails, use user data from auth state
          if (user) {
            reset({
              fullName: user.name || "",
              gender: "",
              dateOfBirth: "",
              country: "",
              city: "",
              username: "",
            });
            if (user.avatar) {
              setProfileImage(user.avatar);
            }
          }
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const genderOptions = ["Male", "Female", "Other"];
  const countryOptions = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
  ];
  const cityOptions = ["New York", "London", "Toronto", "Sydney", "Berlin", "Paris"];

  const onSubmit = async (data: SettingsFormData) => {
    console.log("Form submitted with data:", data);
    try {
      const result = await dispatch(updateUserProfileSettings(data));
      
      if (updateUserProfileSettings.fulfilled.match(result)) {
        toast.success("Profile updated successfully!");
        
        // First, reset form to empty values after successful save
        reset({
          fullName: "",
          gender: "",
          dateOfBirth: "",
          country: "",
          city: "",
          username: "",
        });
        
        // Reset profile image to default
        setProfileImage("https://i.pravatar.cc/150?u=user");
        
        // Then re-fetch profile data to get updated values and pre-fill form
        const refreshResult = await dispatch(fetchUserProfile());
        if (fetchUserProfile.fulfilled.match(refreshResult)) {
          const profileData = refreshResult.payload?.data || refreshResult.payload;
          
          // Set profile image if available
          if (profileData.avatar || profileData.profilePicture) {
            setProfileImage(profileData.avatar || profileData.profilePicture);
          } else if (user?.avatar) {
            setProfileImage(user.avatar);
          }
          
          // Format date of birth if it exists (convert from ISO string to date format)
          let formattedDateOfBirth = "";
          if (profileData.dateOfBirth) {
            try {
              const date = new Date(profileData.dateOfBirth);
              // Format as YYYY-MM-DD for date input
              formattedDateOfBirth = date.toISOString().split('T')[0];
            } catch (e) {
              formattedDateOfBirth = profileData.dateOfBirth;
            }
          }
          
          // Populate form with updated user data from API
          reset({
            fullName: profileData.fullName || profileData.name || user?.name || "",
            gender: profileData.gender || "",
            dateOfBirth: formattedDateOfBirth || profileData.dob || "",
            country: profileData.country || "",
            city: profileData.city || "",
            username: profileData.username || profileData.userName || "",
          });
        }
      } else {
        const errorMessage = result.payload || "Failed to update profile";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
    // Show first error
    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      // Create preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);

      // Convert file to base64 for API (similar to vehicle sale thunk)
      try {
        const base64Image = await new Promise<string>((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => resolve(fileReader.result as string);
          fileReader.onerror = (error) => reject(error);
        });

        // Update profile with image (backend allows only "avatar", not "profilePicture")
        const result = await dispatch(updateUserProfileSettings({
          avatar: base64Image,
        }));
        
        if (updateUserProfileSettings.fulfilled.match(result)) {
          toast.success("Profile picture updated successfully!");
          if (result.payload?.avatar || result.payload?.profilePicture) {
            setProfileImage(result.payload.avatar || result.payload.profilePicture);
          }
        } else {
          const errorMessage = result.payload || "Failed to upload profile picture";
          toast.error(errorMessage);
        }
      } catch (error: any) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload profile picture");
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-700 dark:text-white">Loading profile...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <Image
            src={profileImage}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-gray-200 dark:border-gray-700 object-cover"
            onError={() => setProfileImage("https://i.pravatar.cc/150?u=user")}
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="md"
          className="border-2  bg-transparent"
          onClick={handleUploadClick}
        >
          Upload Profile Picture
        </Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Full Name */}
        <FormInput
          type="text"
          label="Full Name"
          placeholder="FULL NAME"
          {...register("fullName")}
          error={errors.fullName?.message}
          colSpan={2}

        />

        {/* Gender */}
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="Gender"
              value={field.value}
              options={genderOptions}
              onChange={field.onChange}
              error={errors.gender?.message}
            />
          )}
        />

        {/* Date of Birth */}
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Date of Birth"
              value={field.value}
              onChange={field.onChange}
              error={errors.dateOfBirth?.message}
              placeholder="SELECT"
            />
          )}
        />

        {/* Country */}
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="Country"
              value={field.value}
              options={countryOptions}
              onChange={field.onChange}
              error={errors.country?.message}
            />
          )}
        />

        {/* City */}
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="City"
              value={field.value}
              options={cityOptions}
              onChange={field.onChange}
              error={errors.city?.message}
            />
          )}
        />

        {/* Email */}
        {/* <FormInput
          type="email"
          label="Email"
          placeholder="EMAIL"
          {...register("email")}
          error={errors.email?.message}

        /> */}

        {/* Username */}
        <FormInput
          type="text"
          label="Username"
          placeholder="USERNAME"
          {...register("username")}
          error={errors.username?.message}

        />

        {/* Mobile Number */}
        {/* <FormInput
          type="tel"
          label="Mobile Number"
          placeholder="MOBILE NUMBER"
          {...register("mobileNumber")}
          error={errors.mobileNumber?.message}
          colSpan={2}

        /> */}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white px-8 py-3 uppercase font-display tracking-wide"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
