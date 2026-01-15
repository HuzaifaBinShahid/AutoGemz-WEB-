import { ButtonHTMLAttributes } from 'react';

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CommonButton = ({ children, className = '', ...props }: CommonButtonProps) => {
  return (
    <button
      {...props}
      className={`w-full py-3 px-6 font-semibold text-white uppercase transition-colors duration-200 ${className}`}
      style={{ backgroundColor: '#DC3729' }}
    >
      {children}
    </button>
  );
};

export default CommonButton;
