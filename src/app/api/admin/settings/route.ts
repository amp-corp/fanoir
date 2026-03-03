import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getSiteImages, upsertSiteSetting } from '@/lib/db-queries';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const images = await getSiteImages();
    return NextResponse.json(images);
  } catch (e) {
    console.error('Failed to fetch site images:', e);
    return NextResponse.json(
      { hero_image: '', signature_image_1: '', signature_image_2: '' },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const allowedKeys = ['hero_image', 'signature_image_1', 'signature_image_2'];
  const updates: Promise<unknown>[] = [];

  for (const [key, value] of Object.entries(body)) {
    if (allowedKeys.includes(key) && typeof value === 'string') {
      updates.push(upsertSiteSetting(key, value));
    }
  }

  await Promise.all(updates);

  const images = await getSiteImages();
  return NextResponse.json(images);
}
