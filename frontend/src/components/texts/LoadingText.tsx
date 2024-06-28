import React from 'react';
import { CgSpinner } from 'react-icons/cg';

type Props = {
  children: React.ReactNode;
};

const LoadingText = ({ children }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{children}</span>
      <CgSpinner className="w-4 h-4 text-gray-200 animate-spin fill-black" />
    </div>
  );
};

export default LoadingText;
