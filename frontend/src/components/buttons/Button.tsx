import React, { ComponentProps } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface Props extends ComponentProps<'button'> {
  children: React.ReactNode;
  variant?: string;
  className?: string;
  isLoading?: boolean;
}

const variants: Record<string, string> = {
  indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
  green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  yellow: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
  blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  sky: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
};

const Button = ({
  children,
  variant = 'indigo',
  className,
  isLoading = false,
  ...rest
}: Props) => {
  return (
    <button
      className={`inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        variants[variant]
      } ${className} ${isLoading && 'cursor-not-allowed opacity-50'}`}
      disabled={isLoading}
      {...rest}
    >
      {children}
      {isLoading && (
        <CgSpinner className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" />
      )}
    </button>
  );
};

export default Button;
