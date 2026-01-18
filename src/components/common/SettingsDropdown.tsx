import type { SelectHTMLAttributes } from "react";

interface SettingsDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
}

const SettingsDropdown = ({
  label,
  required = false,
  placeholder = "SELECT",
  options,
  ...props
}: SettingsDropdownProps) => {
  return (
    <div className="w-full">
      <label
        className="block mb-2 text-base leading-6 text-[#111111]"
        style={{
          fontFamily: "'Mulish', sans-serif",
          fontWeight: 300,
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-autogemz-orange appearance-none bg-no-repeat bg-right pr-10"
        style={{
          backgroundColor: "#0000000D",
          backdropFilter: "blur(5px)",
          border: "none",
          fontFamily: "'Mulish', sans-serif",
          color: "#00000096",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%231F2937' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          backgroundPosition: "right 12px center",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SettingsDropdown;
