import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "안심콜 | 보이스피싱·스미싱 대응 플랫폼",
    template: "%s | 안심콜",
  },
  description:
    "보이스피싱·스미싱이 의심될 때, 지금 5분 안에 해야 할 일부터 증거 정리·신고 준비까지 상황별로 안내합니다. 한국어 중심, 모바일 우선, 가족/어르신 모드 제공.",
  metadataBase: new URL("https://example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "안심콜 | 보이스피싱·스미싱 대응 플랫폼",
    description:
      "지금 상황에 맞는 5분 대응, 신고/도움 채널, 증거 타임라인 정리를 한 곳에서.",
    siteName: "안심콜",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
