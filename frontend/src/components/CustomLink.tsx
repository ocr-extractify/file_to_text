import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: string;
};

const CustomLink = ({ children, to }: Props) => {
  return (
    <Link
      to={to}
      className="py-1 text-base font-medium text-indigo-600 dark:text-indigo-500 hover:text-white hover:bg-indigo-600"
    >
      {children}
      <span className="ml-1" aria-hidden="true">
        &rarr;
      </span>{' '}
    </Link>
  );
};

export default CustomLink;
