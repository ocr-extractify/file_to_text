import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'button'> {
  children: React.ReactNode;
  className?: string;
}

const IconButton = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        'p-1.5 rounded-full hover:text-indigo-400 transition-transform transform active:scale-90 active:text-black active:dark:text-white active:bg-gray-200 dark:active:bg-gray-700',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
