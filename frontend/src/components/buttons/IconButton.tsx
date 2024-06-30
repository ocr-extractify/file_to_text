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
        'p-1.5 rounded-full transition-transform transform active:scale-90 active:bg-gray-300 dark:active:bg-gray-700',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
