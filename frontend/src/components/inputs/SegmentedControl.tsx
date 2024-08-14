import React from 'react';
import { twMerge } from 'tailwind-merge';

type Option = {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
};

type Props = {
  options: Option[];
  className?: string;
};

const SegmentedControl = ({ options, className }: Props) => {
  return (
    <div
      className={twMerge(
        `w-fit bg-slate-200 dark:bg-slate-800 flex rounded-md p-1`,
        className,
      )}
    >
      {options.map((option, index) => (
        <div
          key={index}
          className={`flex items-center justify-center p-2 px-2 rounded-md cursor-pointer transition-colors duration-300 ease-in-out ${
            option.active ? 'bg-slate-100 dark:bg-slate-700' : ''
          }`}
          onClick={option.onClick}
        >
          {option.icon}
        </div>
      ))}
    </div>
  );
};

export default SegmentedControl;
