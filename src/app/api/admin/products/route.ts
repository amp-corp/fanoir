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

  const body = await request.json();
  const { image, badgeText, badgeColor, category, order, translations } = body;

  const product = await prisma.product.create({
    data: {
      image,
      badgeText: badgeText || null,
      badgeColor: badgeColor || null,
      category,
      order: order ?? 0,
      translations,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
