const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const LOCALE_NAMES: Record<string, string> = {
  ko: 'Korean',
  en: 'English',
  'zh-CN': 'Simplified Chinese',
  'zh-TW': 'Traditional Chinese',
  ja: 'Japanese',
};

export async function translateTexts(
  texts: Record<string, string>,
  sourceLocale: string,
  targetLocales: string[],
): Promise<Record<string, Record<string, string>>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const sourceLang = LOCALE_NAMES[sourceLocale] || sourceLocale;
  const targetLangs = targetLocales.map((l) => `${l} (${LOCALE_NAMES[l] || l})`).join(', ');
  const fields = Object.keys(texts);

  const prompt = `Translate the following fields from ${sourceLang} to these languages: ${targetLangs}.

Source texts (JSON):
${JSON.stringify(texts, null, 2)}

Rules:
- For price fields, convert currency format appropriately (e.g. ₩45,000 → $35.00 for English, ¥5,500 for Japanese, ¥280 for Chinese)
- Keep brand names, proper nouns, and product-specific terms unchanged
- Return ONLY valid JSON, no markdown fences or explanation

Return format (strict JSON):
{
  ${targetLocales.map((l) => `"${l}": { ${fields.map((f) => `"${f}": "translated text"`).join(', ')} }`).join(',\n  ')}
}`;

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!responseText) throw new Error('Empty response from Gemini');

  return JSON.parse(responseText);
}
