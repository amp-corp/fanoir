/**
 * Centralized image specifications for Fanoir.
 * Used by: upload API (server-side optimization), ImageUpload component (client guidance),
 * admin image guide page, and docs.
 */

export type ImageVariant = 'product' | 'banner';

export interface ImageSpec {
  /** Display label */
  label: string;
  /** Aspect ratio string for display (e.g. "1:1") */
  ratioLabel: string;
  /** Width / Height ratio value */
  ratio: number;
  /** Recommended upload width in px */
  width: number;
  /** Recommended upload height in px */
  height: number;
  /** Max file size before optimization (bytes) */
  maxUploadSize: number;
  /** Target file size after optimization (bytes) — soft target */
  targetSize: number;
  /** Sharp quality setting for WebP output (1-100) */
  quality: number;
  /** Description of where this image is used */
  usage: string;
}

export const IMAGE_SPECS: Record<ImageVariant, ImageSpec> = {
  product: {
    label: '상품 이미지',
    ratioLabel: '1:1',
    ratio: 1,
    width: 1000,
    height: 1000,
    maxUploadSize: 5 * 1024 * 1024,   // 5 MB
    targetSize: 200 * 1024,            // ~200 KB after optimization
    quality: 80,
    usage: 'Showcase 그리드, Collection 상품 카드, Signature 이미지',
  },
  banner: {
    label: '컬렉션 배너',
    ratioLabel: '21:9',
    ratio: 21 / 9,
    width: 2400,
    height: 1029,
    maxUploadSize: 10 * 1024 * 1024,  // 10 MB
    targetSize: 400 * 1024,           // ~400 KB after optimization
    quality: 82,
    usage: 'Hero 배경, CollectionBannerSlider, CollectionDetail Hero',
  },
};

/** Global upload constraints */
export const UPLOAD_LIMITS = {
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
  /** Absolute max regardless of variant (bytes) */
  absoluteMax: 10 * 1024 * 1024,  // 10 MB
};

/** Format bytes to human-readable string */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
