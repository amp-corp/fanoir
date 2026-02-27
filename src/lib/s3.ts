import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: process.env.AWS_REGION ?? 'ap-northeast-2' });

const BUCKET = process.env.AWS_S3_BUCKET ?? 'fanoir';
const REGION = process.env.AWS_REGION ?? 'ap-northeast-2';

export async function uploadToS3(
  buffer: Buffer,
  filename: string,
  contentType: string,
): Promise<string> {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `images/${Date.now()}-${sanitized}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );

  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}
