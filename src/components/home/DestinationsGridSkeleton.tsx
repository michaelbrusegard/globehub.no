import { Skeleton } from '@nextui-org/react';

import { cn } from '@/lib/utils';
import { seededRandom } from '@/lib/utils';

function DestinationsGridSkeleton() {
  const randomSmNextMap = {
    0: 1,
    1: 0,
    3: 4,
    4: 3,
  };
  const randomXs = [0, 2, 4][Math.floor(seededRandom(1) * 3)];
  const randomSm = [0, 1, 3, 4][Math.floor(seededRandom(2) * 4)];
  const randomSmNext =
    randomSmNextMap[randomSm as keyof typeof randomSmNextMap];
  return (
    <div className='grid h-[1532px] w-full grid-cols-12 grid-rows-2 gap-2 px-8 xs:h-[916px] sm:h-[608px]'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            index === 0 && 'col-span-12 xs:col-span-6 sm:col-span-4',
            index === 1 && 'col-span-12 xs:col-span-6 sm:col-span-4',
            index === 2 && 'col-span-12 xs:col-span-6 sm:col-span-4',
            index === 3 && 'col-span-12 xs:col-span-6 sm:col-span-4',
            index === 4 && 'col-span-12 xs:col-span-6 sm:col-span-4',
            index === randomXs && 'xs:col-span-12',
            index === randomSm && 'sm:col-span-7',
            index === randomSmNext && 'sm:col-span-5',
          )}
        >
          <Skeleton className='h-[300px] w-full rounded-xl' />
        </div>
      ))}
    </div>
  );
}

export { DestinationsGridSkeleton };
