import { useField } from 'formik';
import { SelectHTMLAttributes } from 'react';

interface CommonSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const CommonSelect = ({ name, label, options, ...props }: CommonSelectProps) => {
  const [field, meta] = useField(name);

  return (
    <div className="w-full">
      <select
        {...field}
        {...props}
        name={name}
        className={`w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-autogemz-orange focus:border-transparent ${
          meta.touched && meta.error ? 'border-red-500' : ''
        }`}
        style={{
          border: `2px solid #0000004D`,
          color: '#00000096',
          fontFamily: "'Mulish', sans-serif",
          backgroundColor: 'white',
        }}
        onFocus={(e) => {
          e.target.style.border = '2px solid transparent';
        }}
        onBlur={(e) => {
          if (!meta.error) {
            e.target.style.border = '2px solid #0000004D';
          }
        }}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="mt-1 text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default CommonSelect;
