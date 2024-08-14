import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';
import { IoIosWarning } from 'react-icons/io';
import { MdError } from 'react-icons/md';
import { IoMdInformationCircle } from 'react-icons/io';

const colors: Record<string, string> = {
  warn: 'yellow',
  info: 'blue',
  error: 'red',
};

const icons = {
  warn: IoIosWarning,
  info: IoMdInformationCircle,
  error: MdError,
};

interface Props {
  className?: string;
  variant?: 'warn' | 'info' | 'error';
  children: ReactNode;
}

/**
 * Alert component displays an error message with a red background.
 *
 * @param {Props} props - The component props.
 */
export default function Alert({
  className,
  children,
  variant = 'info',
}: Props) {
  const IconComponent = icons[variant as keyof typeof icons];

  return (
    <div
      className={twMerge(
        `p-4 rounded-md bg-${colors[variant] || variant}-50`,
        className,
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {IconComponent && (
            <IconComponent
              className={`w-5 h-5 text-${colors[variant] || variant}-400`}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <div className={`text-sm text-${colors[variant] || variant}-700`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
