import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const collections = await prisma.collection.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { products: true } } },
  });

  return NextResponse.json(collections);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { slug, image, order, translations, productIds } = body;

  const collection = await prisma.collection.create({
    data: {
      slug,
      image,
      order: order ?? 0,
      translations,
      products: productIds?.length
        ? {
            create: productIds.map((id: string, i: number) => ({
              productId: id,
              order: i,
            })),
          }
        : undefined,
    },
    include: { products: { include: { product: true } } },
  });

  return NextResponse.json(collection, { status: 201 });
}
