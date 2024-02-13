import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { signIn } from '@/lib/auth';

import { GitHubLogo } from '@/components/assets/GitHubLogo';
import { GoogleLogo } from '@/components/assets/GoogleLogo';
import { SignInButton } from '@/components/auth/SignInButton';
import { Logo } from '@/components/layout/Logo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('signIn'),
  };
}

export default function SignIn({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('signIn');
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Card className='m-2 h-64 w-full max-w-md p-2 xs:m-8'>
        <CardHeader className='flex items-center justify-center p-4'>
          <Logo />
        </CardHeader>
        <Divider />
        <CardBody className='flex items-center justify-center gap-4'>
          <SignInButton
            signIn={async () => {
              'use server';
              await signIn('google');
            }}
            color='warning'
            startContent={<GoogleLogo />}
          >
            {t('signInWith', { provider: 'Google' })}
          </SignInButton>
          <SignInButton
            signIn={async () => {
              'use server';
              await signIn('github');
            }}
            color='secondary'
            startContent={<GitHubLogo />}
          >
            {t('signInWith', { provider: 'GitHub' })}
          </SignInButton>
        </CardBody>
      </Card>
    </div>
  );
}
