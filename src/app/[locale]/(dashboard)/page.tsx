import { Image } from '@nextui-org/react';
import { unstable_setRequestLocale } from 'next-intl/server';
import NextImage from 'next/image';

import { auth } from '@/lib/auth';
import { type User, sql } from '@/lib/db';

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const session = await auth();
  const data: User[] = await sql`SELECT * FROM users;`;
  return (
    <div className='h-[150vh]'>
      <h2>Landing Page</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {data.map((user) => {
        return (
          <>
            <p key={user.id}>
              {user.name} - {user.email} - {user.id}
            </p>
            <Image
              as={NextImage}
              src={user.image}
              alt='user profile photo'
              height={500}
              width={500}
            />
          </>
        );
      })}
    </div>
  );
}
