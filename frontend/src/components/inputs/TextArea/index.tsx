import { Textarea } from '@headlessui/react';
import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import Icons from '@/components/inputs/TextArea/Icons';

interface Props extends ComponentProps<'textarea'> {
  data?: string;
  label: string;
  className?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const TextArea = ({ data, label, className, ...rest }: Props) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 relative">
          <label htmlFor="comment" className="sr-only">
            {label}
          </label>

          <Icons data={data} />

          <Textarea
            className={twMerge(
              `block w-full p-3 border-0 focus:ring-0 sm:text-sm`,
              className,
            )}
            {...rest}
            defaultValue={data}
          />
        </div>
      </div>
    </div>
  );
};

export default TextArea;
