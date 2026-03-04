import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { image, badgeText, badgeColor, categoryId, order, translations, comingSoon, comingSoonUntil, link } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(image !== undefined && { image }),
        ...(badgeText !== undefined && { badgeText: badgeText || null }),
        ...(badgeColor !== undefined && { badgeColor: badgeColor || null }),
        ...(categoryId !== undefined && { categoryId }),
        ...(comingSoon !== undefined && { comingSoon }),
        ...(comingSoonUntil !== undefined && { comingSoonUntil: comingSoonUntil ? new Date(comingSoonUntil) : null }),
        ...(link !== undefined && { link: link || null }),
        ...(order !== undefined && { order }),
        ...(translations !== undefined && { translations }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT /api/admin/products/[id] error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
