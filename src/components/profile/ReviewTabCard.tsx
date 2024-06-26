import { Card, CardBody, CardHeader, Link } from '@nextui-org/react';

import { type Review, type User } from '@/lib/db';

import { ReviewCard } from '@/components/reviews/ReviewCard';

type ReviewTabCardProps = {
  review: Review & { name: string };
  author: User & { contributions: number };
  t: {
    goToDestination: string;
    contributions: string;
    modified: string;
    reviews: string;
    reviewImage: string;
  };
};

function ReviewTabCard({ review, author, t }: ReviewTabCardProps) {
  return (
    <Card>
      <CardHeader className='flex items-center justify-between gap-1'>
        <h3 className='text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:text-4xl'>
          {review.name}
        </h3>
        <Link
          href={`/${review.destinationId}#${t.reviews}`}
          underline='hover'
          showAnchorIcon
        >
          {t.goToDestination}
        </Link>
      </CardHeader>
      <CardBody>
        <ReviewCard
          review={review}
          author={author}
          disablePopover
          t={{
            contributions: t.contributions,
            modified: t.modified,
            reviewImage: t.reviewImage,
          }}
        />
      </CardBody>
    </Card>
  );
}

export { ReviewTabCard };
