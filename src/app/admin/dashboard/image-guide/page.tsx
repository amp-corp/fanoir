import { IMAGE_SPECS, UPLOAD_LIMITS, formatBytes } from '@/lib/image-specs';

export default function ImageGuidePage() {
  const variants = Object.entries(IMAGE_SPECS) as [
    string,
    (typeof IMAGE_SPECS)[keyof typeof IMAGE_SPECS],
  ][];

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Image Guide</h1>
      <p className="text-sm text-gray-500 mb-8">
        이미지 업로드 시 아래 권장 사양을 따르면 최적의 품질과 로딩 속도를 얻을
        수 있습니다. 업로드 시 서버에서 자동으로 리사이즈 &amp; WebP 변환이
        적용됩니다.
      </p>

      {/* Spec Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {variants.map(([key, spec]) => (
          <div
            key={key}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Aspect ratio preview */}
            <div
              className="bg-gray-100 flex items-center justify-center text-gray-400 border-b border-gray-200"
              style={{
                aspectRatio: key === 'banner' ? '21/9' : '1/1',
                margin: '0 auto',
                maxHeight: '200px',
                ...(key !== 'banner' && {
                  borderLeft: '1px solid #e5e7eb',
                  borderRight: '1px solid #e5e7eb',
                }),
              }}
            >
              <div className="text-center">
                <p className="text-3xl font-black text-gray-300">
                  {spec.ratioLabel}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {spec.width} x {spec.height} px
                </p>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <h2 className="text-base font-bold text-gray-900">
                {spec.label}
              </h2>

              <table className="text-sm w-full">
                <tbody className="divide-y divide-gray-100">
                  <Row label="비율" value={spec.ratioLabel} />
                  <Row
                    label="권장 해상도"
                    value={`${spec.width} x ${spec.height} px`}
                  />
                  <Row
                    label="최대 업로드"
                    value={formatBytes(spec.maxUploadSize)}
                  />
                  <Row
                    label="최적화 후 목표"
                    value={`~${formatBytes(spec.targetSize)}`}
                  />
                  <Row label="출력 포맷" value="WebP" />
                  <Row label="품질" value={`${spec.quality}%`} />
                  <Row label="사용처" value={spec.usage} />
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Location Map */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          이미지 업로드 위치
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  이미지 슬롯
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  규격
                </th>
                <th className="text-left py-2 text-gray-500 font-medium">
                  업로드 위치
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">
                  Hero 배경
                </td>
                <td className="py-2.5 pr-4 text-gray-600">배너 (21:9)</td>
                <td className="py-2.5 text-gray-600">
                  Site Images &gt; Hero 배경 이미지
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">
                  Signature 이미지 (2장)
                </td>
                <td className="py-2.5 pr-4 text-gray-600">상품 (1:1)</td>
                <td className="py-2.5 text-gray-600">
                  Site Images &gt; Signature 이미지 1, 2
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">
                  상품 이미지
                </td>
                <td className="py-2.5 pr-4 text-gray-600">상품 (1:1)</td>
                <td className="py-2.5 text-gray-600">
                  Products &gt; 상품 편집 &gt; Image
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">
                  컬렉션 배너
                </td>
                <td className="py-2.5 pr-4 text-gray-600">배너 (21:9)</td>
                <td className="py-2.5 text-gray-600">
                  Collections &gt; 컬렉션 편집 &gt; Image
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Optimization Info */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          자동 최적화 프로세스
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Step
            step="1"
            title="업로드"
            desc="JPEG, PNG, WebP 원본 이미지를 업로드합니다."
          />
          <Step
            step="2"
            title="리사이즈 & 크롭"
            desc="권장 해상도에 맞게 자동 리사이즈 및 center-crop 처리됩니다."
          />
          <Step
            step="3"
            title="WebP 변환"
            desc="WebP 포맷으로 변환하여 용량을 60~80% 절감합니다."
          />
        </div>
      </section>

      {/* File Size Guide */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">용량 가이드</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  구분
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  원본 (JPEG)
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  원본 (PNG)
                </th>
                <th className="text-left py-2 text-gray-500 font-medium">
                  최적화 후 (WebP)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">
                  상품 (1000x1000)
                </td>
                <td className="py-2.5 pr-4 text-gray-600">200~500 KB</td>
                <td className="py-2.5 pr-4 text-gray-600">500KB~2 MB</td>
                <td className="py-2.5 text-green-600 font-medium">
                  ~150~250 KB
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">
                  배너 (2400x1029)
                </td>
                <td className="py-2.5 pr-4 text-gray-600">500KB~2 MB</td>
                <td className="py-2.5 pr-4 text-gray-600">2~5 MB</td>
                <td className="py-2.5 text-green-600 font-medium">
                  ~300~500 KB
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          * next/image가 클라이언트 디바이스에 맞게 추가 리사이즈를 자동
          수행합니다.
        </p>
      </section>

      {/* Tips */}
      <section className="bg-amber-50 rounded-xl border border-amber-200 p-6">
        <h2 className="text-base font-bold text-amber-900 mb-3">Tips</h2>
        <ul className="text-sm text-amber-800 flex flex-col gap-2">
          <li>
            • <b>상품 이미지</b>: 정방형(1:1) 사진을 준비하세요. 직사각형이면
            중앙 기준 크롭됩니다.
          </li>
          <li>
            • <b>배너 이미지</b>: 21:9 가로형 사진을 준비하세요. 텍스트가 하단에
            오버레이되므로 핵심 피사체는 중앙~상단에 배치하세요.
          </li>
          <li>
            • <b>PNG 대신 JPEG</b>: 사진은 JPEG가 원본 용량이 작아 업로드가
            빠릅니다. 투명 배경이 필요한 경우만 PNG를 사용하세요.
          </li>
          <li>
            • <b>과도한 고해상도 지양</b>: 4000px 이상의 원본은 업로드 시간만
            늘어나고 결과물은 동일합니다. 권장 해상도의 1~2배면 충분합니다.
          </li>
          <li>
            • 허용 포맷:{' '}
            {UPLOAD_LIMITS.allowedTypes
              .map((t) => t.split('/')[1].toUpperCase())
              .join(', ')}
          </li>
        </ul>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="py-1.5 pr-4 text-gray-500 whitespace-nowrap">{label}</td>
      <td className="py-1.5 text-gray-900">{value}</td>
    </tr>
  );
}

function Step({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#222222] text-white text-xs font-bold">
          {step}
        </span>
        <span className="text-sm font-bold text-gray-900">{title}</span>
      </div>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  );
}
