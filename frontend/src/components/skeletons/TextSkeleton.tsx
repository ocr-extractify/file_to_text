type Props = {
  className?: string;
};

const TextSkeleton = ({ className }: Props) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-800 rounded ${className}`}
    >
      <div className="h-4 w-1/2 mt-2 mb-2" />
    </div>
  );
};

export default TextSkeleton;
