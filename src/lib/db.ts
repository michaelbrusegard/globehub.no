import { env } from '@/env';
import postgres from 'postgres';

const sql = postgres({
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  database: env.DATABASE_NAME,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  transform: postgres.toCamel,
});

type User = {
  id: number;
  name?: string;
  email?: string;
  image?: string;
  role: string;
  bio?: string;
  createdAt: Date;
};

type Destination = {
  id: number;
  userId: number;
  name: string;
  content: string;
  exclusiveContent: string;
  location: string;
  images: string[];
  createdAt: Date;
  views: number;
};

type Review = {
  userId: number;
  destinationId: number;
  rating: number;
  comment?: string;
  image?: string;
};

type Keyword = {
  id: number;
  name: string;
};

export { sql, type User, type Destination, type Review, type Keyword };