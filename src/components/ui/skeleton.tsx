import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

function Skeleton({
  className,
  ...props
}: SkeletonProps & React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'animate-pulse rounded-md bg-gray-300 dark:bg-gray-surface',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
