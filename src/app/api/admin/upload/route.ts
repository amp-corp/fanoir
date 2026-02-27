import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { uploadToS3 } from '@/lib/s3';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Only JPEG, PNG, WebP images are allowed' },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: 'File size must be under 5MB' },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadToS3(buffer, file.name, file.type);

  return NextResponse.json({ url });
}
