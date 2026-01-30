import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FANOIR — Fandom, refined.",
  description:
    "세련되고 품격 있는 팬덤 굿즈 브랜드 FANOIR. 덕질을 세련되게.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
