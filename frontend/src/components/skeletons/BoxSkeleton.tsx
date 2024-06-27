import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

const BoxSkeleton = ({ className }: Props) => {
  return (
    <div
      className={twMerge(
        'h-32 w-32 mx-auto bg-gray-300 dark:bg-gray-700 max-w-[540px] animate-pulse py-1',
        className,
      )}
    />
  );
};

export default BoxSkeleton;
