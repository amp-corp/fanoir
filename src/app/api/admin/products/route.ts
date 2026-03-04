import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { image, badgeText, badgeColor, categoryId, order, translations, comingSoon, comingSoonUntil, link } = body;

    const product = await prisma.product.create({
      data: {
        image,
        badgeText: badgeText || null,
        badgeColor: badgeColor || null,
        categoryId,
        comingSoon: comingSoon ?? false,
        comingSoonUntil: comingSoonUntil ? new Date(comingSoonUntil) : null,
        link: link || null,
        order: order ?? 0,
        translations,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/products error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
