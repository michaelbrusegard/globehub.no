import EditSquare from '@material-symbols/svg-400/outlined/edit_square.svg';
import {
  Button,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User as UserAvatar,
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import NextImage from 'next/image';
import readingTime from 'reading-time';

import { type User } from '@/lib/db';
import type { Destination } from '@/lib/db';
import { cn, getInitials } from '@/lib/utils';

import { FavoriteButton } from '@/components/destination/FavoriteButton';
import { UserCard } from '@/components/destination/UserCard';

type AuthorPopoverProps = {
  className?: string;
  user: User | undefined;
  author: User;
  destination: Destination;
  favorite: boolean;
  updateFavorite: (favorite: boolean) => void;
};

function AuthorPopover({
  className,
  user,
  author,
  destination,
  favorite,
  updateFavorite,
}: AuthorPopoverProps) {
  const t = useTranslations('destination');
  const { minutes } = readingTime(destination.content);
  return (
    <div className={cn('w-full items-center justify-between', className)}>
      <Popover showArrow shouldBlockScroll placement='bottom'>
        <PopoverTrigger>
          <UserAvatar
            classNames={{
              name: 'text-xl font-bold',
              description: 'text-sm',
            }}
            as='button'
            name={author.name}
            description={
              t('readTime', { count: Math.ceil(minutes) }) +
              String.fromCharCode(160) +
              ' • ' +
              String.fromCharCode(160) +
              t('views', { count: destination.views })
            }
            avatarProps={{
              classNames: {
                name: 'font-arimo font-semibold',
              },
              ImgComponent: NextImage,
              imgProps: {
                width: 48,
                height: 48,
                fetchPriority: 'high',
                loading: 'eager',
              },
              size: 'lg',
              name: getInitials(author.name!),
              src: author.image,
              'aria-hidden': true,
            }}
          />
        </PopoverTrigger>
        <PopoverContent className='p-1'>
          <UserCard user={author} />
        </PopoverContent>
      </Popover>
      <div>
        {user && (
          <FavoriteButton
            user={user}
            destination={destination}
            favorite={favorite}
            updateFavorite={updateFavorite}
          ></FavoriteButton>
        )}
        {user && (user.role === 'admin' || user.id === author.id) && (
          <Button
            as={Link}
            href={'/' + destination.id + '/edit'}
            color='warning'
            radius='sm'
            startContent={
              <EditSquare
                className='size-5 fill-warning-foreground'
                aria-hidden='true'
              />
            }
          >
            {t('edit')}
          </Button>
        )}
      </div>
    </div>
  );
}

export { AuthorPopover };
