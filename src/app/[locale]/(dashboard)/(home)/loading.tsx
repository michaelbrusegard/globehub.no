import { Skeleton } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

import { DestinationsGridSkeleton } from '@/components/home/DestinationsGridSkeleton';
import { DestinationsPaginationSkeleton } from '@/components/home/DestinationsPaginationSkeleton';

export default function HomeLoading() {
  const t = useTranslations('home');
  return (
    <>
      <div className='flex flex-col items-center'>
        <Skeleton className='mx-8 mb-2 h-9 w-[260px] self-auto rounded-medium p-1 sm:self-start' />
        <DestinationsGridSkeleton />
        <DestinationsPaginationSkeleton />
      </div>
      <div className='mb-12'>
        <h2 className='my-4 bg-gradient-to-br from-primary to-secondary bg-clip-text font-arimo text-3xl font-bold tracking-tight text-transparent lg:text-4xl'>
          {t('filterTitle')}
        </h2>
        <div className='mb-2 flex gap-2'>
          <Skeleton className='h-12 w-2/3 rounded-medium' />
          <Skeleton className='h-12 w-full rounded-medium' />
        </div>
      </div>
    </>
  );
}
