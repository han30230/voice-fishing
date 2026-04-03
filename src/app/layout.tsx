import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SITE_BRAND, SITE_TAGLINE_KO } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTitle = `${SITE_BRAND} | ${SITE_TAGLINE_KO}`;

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_BRAND}`,
  },
  description:
    "보이스피싱·스미싱 의심 시 선제적 조치, 공공·금융기관 등 공식 신고·상담 절차 안내, 증거 자료 정리까지 단계별로 제공합니다. 정부·공공기관을 대리하지 않는 정보 서비스이며, 모바일·가족 모드를 지원합니다.",
  metadataBase: getSiteUrl(),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: defaultTitle,
    description:
      "상황별 즉시 조치 요약, 공식 도움 채널 연계, 증거·타임라인 정리를 통합 제공하는 보이스피싱·스미싱 대응 정보 포털입니다.",
    siteName: SITE_BRAND,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "보이스피싱·스미싱 대응 절차 안내, 공식 신고·상담 연계, 증거 정리 도구를 제공하는 정보 서비스입니다.",
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
      className={`${notoSansKr.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
