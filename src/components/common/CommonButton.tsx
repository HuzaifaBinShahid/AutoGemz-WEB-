import type { ButtonHTMLAttributes } from 'react';

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const CommonButton = ({ children, className = '', isLoading, disabled, ...props }: CommonButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`w-full py-3 px-6 font-semibold text-white uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
        (isLoading || disabled) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
      } ${className}`}
      style={{ backgroundColor: '#DC3729' }}
    >
      {isLoading && (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default CommonButton;
