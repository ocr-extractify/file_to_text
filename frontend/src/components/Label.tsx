import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  /** The ID of the form element that the label is associated with. */
  htmlFor: string;
  /** The component to be displayed inside the label. */
  children: React.ReactNode;
  /** The additional CSS class name for the label. */
  className?: string;
  /** Flag indicating if the label is required. */
  required?: boolean;
};

const Label: React.FC<Props> = ({ htmlFor, children, className, required }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge('block text-sm font-medium text-gray-700', className)}
    >
      {children}
      {required && <span className="text-red-500">&nbsp;*</span>}
    </label>
  );
};

export default Label;