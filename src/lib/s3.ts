import { env } from '@/env';
import {
  PutObjectCommand,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';

const config: S3ClientConfig = {
  credentials: {
    accessKeyId: env.STORAGE_USER,
    secretAccessKey: env.STORAGE_PASSWORD,
  },
  endpoint: 'http://' + env.STORAGE_HOST + ':' + env.STORAGE_PORT,
  forcePathStyle: true,
  region: 'eu-north-1',
};

const s3 = new S3Client(config);

const buckets = env.STORAGE_NAME.split(',');

const destinationsBucket = buckets[0]!;
const reviewsBucket = buckets[1]!;

export { s3, destinationsBucket, reviewsBucket, PutObjectCommand };