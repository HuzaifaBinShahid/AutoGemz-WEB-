import type { InputHTMLAttributes } from "react";

interface SettingsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const SettingsInput = ({ label, required = false, name, ...props }: SettingsInputProps) => {
  return (
    <div className="w-full">
      <style>{`
        input[name="${name}"]::placeholder {
          color: #00000096 !important;
        }
      `}</style>
      <label
        className="block mb-2 text-base leading-6 text-[#111111]"
        style={{
          fontFamily: "'Mulish', sans-serif",
          fontWeight: 300,
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        name={name}
        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-autogemz-orange"
        style={{
          backgroundColor: "#0000000D",
          backdropFilter: "blur(5px)",
          border: "none",
          fontFamily: "'Mulish', sans-serif",
          color: "#00000096",
        }}
      />
    </div>
  );
};

export default SettingsInput;
