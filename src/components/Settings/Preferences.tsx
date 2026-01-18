import { useState } from "react";
import SettingsDropdown from "../common/SettingsDropdown";

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    theme: "",
    language: "",
    timezone: "",
  });

  const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "auto", label: "Auto" },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "ur", label: "Urdu" },
  ];

  const timezoneOptions = [
    { value: "pst", label: "PST" },
    { value: "ist", label: "IST" },
    { value: "gmt", label: "GMT" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="bg-white p-6"
      style={{
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        borderRadius: "0",
      }}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SettingsDropdown
          name="theme"
          label="Theme"
          placeholder="SELECT THEME"
          options={themeOptions}
          value={preferences.theme}
          onChange={handleChange}
        />

        <SettingsDropdown
          name="language"
          label="Language"
          required
          placeholder="SELECT LANGUAGE"
          options={languageOptions}
          value={preferences.language}
          onChange={handleChange}
        />

        <SettingsDropdown
          name="timezone"
          label="Timezone"
          placeholder="SELECT TIMEZONE"
          options={timezoneOptions}
          value={preferences.timezone}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <button
          className="px-6 py-3 uppercase font-semibold text-white transition-colors bg-autogemz-orange"
        >
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
};

export default Preferences;
