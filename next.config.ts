import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NCloud 배포: standalone 빌드로 산출물 최소화
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fanoir.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
