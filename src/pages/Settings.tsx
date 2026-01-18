import { useState } from "react";
import SettingsInput from "../components/common/SettingsInput";
import SettingsDropdown from "../components/common/SettingsDropdown";
import AccountSecurity from "../components/Settings/AccountSecurity";
import NotificationPreferences from "../components/Settings/NotificationPreferences";
import Preferences from "../components/Settings/Preferences";

const Settings = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    assignedBranch: "",
    email: "",
    phone: "",
  });

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "staff", label: "Staff" },
  ];

  const branchOptions = [
    { value: "lahore", label: "Lahore" },
    { value: "karachi", label: "Karachi" },
    { value: "islamabad", label: "Islamabad" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          className="text-xl font-semibold text-gray-900 mb-6"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0.14em",
            verticalAlign: "middle",
          }}
        >
          Account Settings
        </h2>

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mb-4">
            <img
              src="https://ui-avatars.com/api/?name=User&background=random"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="px-4 py-2 uppercase font-semibold text-white transition-colors bg-autogemz-orange"
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
            onChange={handleInputChange}
          />

          <SettingsDropdown
            name="role"
            label="Role"
            required
            placeholder="SELECT"
            options={roleOptions}
            value={formData.role}
            onChange={handleInputChange}
          />

          <SettingsInput
            name="phone"
            label="Phone Number"
            required
            type="tel"
            placeholder="MOBILE NUMBER"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <SettingsDropdown
            name="assignedBranch"
            label="Assigned Branch"
            required
            placeholder="SELECT"
            options={branchOptions}
            value={formData.assignedBranch}
            onChange={handleInputChange}
          />
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
