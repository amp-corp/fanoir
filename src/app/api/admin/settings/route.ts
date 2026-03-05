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
      { heroSlides: [], identityGallery: [], identitySlider: [], showcaseMood: [] },
    );
  }
}

const KEY_MAP: Record<string, string> = {
  heroSlides: 'hero_slides',
  identityGallery: 'identity_gallery',
  identitySlider: 'identity_slider',
  showcaseMood: 'showcase_mood',
};

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const updates: Promise<unknown>[] = [];

  for (const [field, dbKey] of Object.entries(KEY_MAP)) {
    if (field in body && Array.isArray(body[field])) {
      updates.push(upsertSiteSetting(dbKey, JSON.stringify(body[field])));
    }
  }

  await Promise.all(updates);

  const images = await getSiteImages();
  return NextResponse.json(images);
}
