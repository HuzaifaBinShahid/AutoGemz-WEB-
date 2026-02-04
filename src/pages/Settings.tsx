import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { userService } from "@/services/userService";
import { logoutUser } from "@/store/thunks/authThunks";
import type { AppDispatch } from "@/store";
import SettingsInput from "../components/common/SettingsInput";
import SettingsDropdown from "../components/common/SettingsDropdown";
import AccountSecurity from "../components/Settings/AccountSecurity";
import NotificationPreferences from "../components/Settings/NotificationPreferences";
import Preferences from "../components/Settings/Preferences";

const Settings = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    city: "",
    email: "", // Read only likely
    role: "",  // Read only likely
    phone: "", // For display
  });

  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : "",
        country: profile.country || "",
        city: profile.city || "",
        email: profile.email || "",
        role: profile.role || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.response?.data?.message || "Error loading profile");
    }
  }, [isError, error]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => userService.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    },
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const payload = {
      fullName: formData.fullName,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      country: formData.country,
      city: formData.city,
    };
    updateMutation.mutate(payload);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
  };

  if (isLoading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="p-6 bg-[#F2F2F2] min-h-screen">
      <div
        className="bg-white p-6"
        style={{
          boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
          borderRadius: "0",
        }}
      >
        <h2
          className="text-xl font-semibold text-gray-900 mb-6 uppercase"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0.14em",
          }}
        >
          Account Settings
        </h2>

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mb-4 border-2 border-autogemz-orange">
            <img
              src={profile?.avatar || `https://ui-avatars.com/api/?name=${formData.fullName || 'User'}&background=random`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="px-4 py-2 uppercase font-semibold text-white transition-colors bg-autogemz-orange hover:bg-opacity-90"
          >
            Upload Profile Picture
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsInput
            name="fullName"
            label="Full Name"
            required
            placeholder="ENTER NAME"
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <SettingsInput
            name="email"
            label="Email Address"
            required
            type="email"
            placeholder="ENTER EMAIL"
            value={formData.email}
            disabled
          />

          <SettingsDropdown
            name="gender"
            label="Gender"
            required
            placeholder="SELECT"
            options={genderOptions}
            value={formData.gender}
            onChange={handleInputChange}
          />

          <SettingsInput
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            placeholder="YYYY-MM-DD"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />

          <SettingsInput
            name="country"
            label="Country"
            placeholder="ENTER COUNTRY"
            value={formData.country}
            onChange={handleInputChange}
          />

          <SettingsInput
            name="city"
            label="City"
            placeholder="ENTER CITY"
            value={formData.city}
            onChange={handleInputChange}
          />

          <SettingsInput
            name="role"
            label="Role"
            placeholder="ROLE"
            value={formData.role}
            disabled
          />

          <SettingsInput
            name="phone"
            label="Phone Number"
            placeholder="MOBILE NUMBER"
            value={formData.phone}
            disabled
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleLogout}
            className="px-8 py-3 uppercase font-bold text-autogemz-orange border-2 border-autogemz-orange transition-all hover:bg-orange-50 active:scale-95 shadow-sm"
          >
            LOGOUT
          </button>
          <button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className={`px-8 py-3 uppercase font-bold text-white transition-all shadow-md ${
              updateMutation.isPending ? "bg-gray-400" : "bg-autogemz-orange hover:scale-105 active:scale-95"
            }`}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <AccountSecurity />
      </div>

      <div className="mt-6">
        <NotificationPreferences />
      </div>

      <div className="mt-6">
        <Preferences />
      </div>
    </div>
  );
};

export default Settings;
