import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';

interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const CommonInput = ({ name, label, ...props }: CommonInputProps) => {
  const [field, meta] = useField(name);

  return (
    <div className="w-full">
      <style>{`
        input[name="${name}"]::placeholder {
          color: #00000096 !important;
        }
      `}</style>
      <input
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
        }}
        onFocus={(e) => {
          e.target.style.border = '2px solid transparent';
        }}
        onBlur={(e) => {
          if (!meta.error) {
            e.target.style.border = '2px solid #0000004D';
          }
        }}
        placeholder={label}
      />
      {meta.touched && meta.error && (
        <div className="mt-1 text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default CommonInput;
