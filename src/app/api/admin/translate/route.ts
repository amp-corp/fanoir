import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { translateTexts } from '@/lib/gemini';

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { texts, sourceLocale, targetLocales } = await request.json();

  if (!texts || !sourceLocale || !targetLocales?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const hasContent = Object.values(texts as Record<string, string>).some((v) => v.trim());
  if (!hasContent) {
    return NextResponse.json({ error: 'No text to translate' }, { status: 400 });
  }

  try {
    const translations = await translateTexts(texts, sourceLocale, targetLocales);
    return NextResponse.json({ translations });
  } catch (e) {
    console.error('Translation error:', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Translation failed' },
      { status: 500 },
    );
  }
}
