import { type Pathnames } from 'next-intl/navigation';

const locales = ['no'];
const defaultLocale = 'no';
const localePrefix = 'as-needed';

const pathnames = {
  '/': '/',
  '/signin': {
    no: '/logg-inn',
  },
  '/profile': {
    no: '/profil',
  },
  '/new': {
    no: '/ny',
  },
  '/error': {
    no: '/feil',
  },
  '/not-found': {
    no: '/ikke-funnet',
  },
  '/[destination]/edit': {
    no: '/[destination]/rediger',
  },
  '/[destination]': {
    no: '/[destination]',
  },
} satisfies Pathnames<typeof locales>;

export { locales, defaultLocale, localePrefix, pathnames };
