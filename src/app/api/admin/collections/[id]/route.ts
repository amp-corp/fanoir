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
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: { products: { include: { product: true }, orderBy: { order: 'asc' } } },
  });

  if (!collection) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(collection);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { slug, image, order, translations, productIds } = body;

  // Update collection-product joins
  if (productIds) {
    await prisma.collectionProduct.deleteMany({ where: { collectionId: id } });
    if (productIds.length > 0) {
      await prisma.collectionProduct.createMany({
        data: productIds.map((pid: string, i: number) => ({
          collectionId: id,
          productId: pid,
          order: i,
        })),
      });
    }
  }

  const collection = await prisma.collection.update({
    where: { id },
    data: {
      ...(slug !== undefined && { slug }),
      ...(image !== undefined && { image }),
      ...(order !== undefined && { order }),
      ...(translations !== undefined && { translations }),
    },
    include: { products: { include: { product: true }, orderBy: { order: 'asc' } } },
  });

  return NextResponse.json(collection);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.collection.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
