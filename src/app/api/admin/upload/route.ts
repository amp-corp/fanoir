import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { uploadToS3 } from '@/lib/s3';
import { IMAGE_SPECS, UPLOAD_LIMITS, type ImageVariant } from '@/lib/image-specs';

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const variant = (formData.get('variant') as ImageVariant) || 'product';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!UPLOAD_LIMITS.allowedTypes.includes(file.type as typeof UPLOAD_LIMITS.allowedTypes[number])) {
    return NextResponse.json(
      { error: 'Only JPEG, PNG, WebP images are allowed' },
      { status: 400 },
    );
  }

  const spec = IMAGE_SPECS[variant];

  if (file.size > spec.maxUploadSize) {
    const maxMB = (spec.maxUploadSize / (1024 * 1024)).toFixed(0);
    return NextResponse.json(
      { error: `File size must be under ${maxMB}MB for ${spec.label}` },
      { status: 400 },
    );
  }

  const rawBuffer = Buffer.from(await file.arrayBuffer());

  // Optimize: resize to spec dimensions and convert to WebP
  const optimized = await sharp(rawBuffer)
    .resize(spec.width, spec.height, {
      fit: 'cover',
      position: 'centre',
      withoutEnlargement: true,
    })
    .webp({ quality: spec.quality })
    .toBuffer();

  // Use .webp extension for the optimized file
  const baseName = file.name.replace(/\.[^.]+$/, '');
  const optimizedName = `${baseName}.webp`;

  const url = await uploadToS3(optimized, optimizedName, 'image/webp');

  return NextResponse.json({
    url,
    originalSize: file.size,
    optimizedSize: optimized.length,
    dimensions: { width: spec.width, height: spec.height },
  });
}
