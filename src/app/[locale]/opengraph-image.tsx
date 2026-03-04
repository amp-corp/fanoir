import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FANOIR — By Fans, For The Moment';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const copyMap: Record<string, { tagline: string; subtitle: string }> = {
    ko: {
      tagline: '응원하는 모든 순간, 파누아와 함께',
      subtitle: '좋아하는 마음, 가장 예쁘게',
    },
    en: {
      tagline: 'Every moment you cheer, with FANOIR',
      subtitle: 'Your love, beautifully made',
    },
    'zh-CN': {
      tagline: '应援的每个瞬间，与FANOIR一起',
      subtitle: '喜欢的心情，最好看地呈现',
    },
    'zh-TW': {
      tagline: '應援的每個瞬間，與FANOIR一起',
      subtitle: '喜歡的心情，最好看地呈現',
    },
    ja: {
      tagline: '応援するすべての瞬間、FANOIRと一緒に',
      subtitle: '好きな気持ち、いちばんかわいく',
    },
  };

  const copy = copyMap[locale] ?? copyMap.en;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div
        style={{
          fontSize: 14,
          letterSpacing: '0.25em',
          color: '#222222',
          marginBottom: 28,
          fontWeight: 500,
        }}
      >
        BY FANS, FOR THE MOMENT
      </div>

      <div
        style={{
          fontSize: 72,
          letterSpacing: '0.3em',
          color: '#222222',
          fontWeight: 700,
          marginBottom: 28,
        }}
      >
        FANOIR
      </div>

      <div
        style={{
          width: 100,
          height: 1,
          backgroundColor: '#222222',
          marginBottom: 28,
        }}
      />

      <div
        style={{
          fontSize: 22,
          letterSpacing: '0.08em',
          color: '#3D3D3D',
          marginBottom: 12,
          textShadow: '0 2px 2px rgba(0, 1, 1, 0.5)',
        }}
      >
        {copy.tagline}
      </div>
      <div
        style={{
          fontSize: 16,
          color: '#888888',
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}
      >
        {copy.subtitle}
      </div>
    </div>,
    { ...size },
  );
}
