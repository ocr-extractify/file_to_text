import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

const TextSkeleton = ({ className }: Props) => {
  return (
    <div
      className={twMerge(
        'h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] animate-pulse py-1',
        className,
      )}
    />
  );
};

export default TextSkeleton;
