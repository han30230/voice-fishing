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
const siteUrl = getSiteUrl();

const ogDescription =
  "보이스피싱 즉시 조치, 신고·법률 지원 채널 연계, 공공·금융기관 등 공식 신고·상담 절차 안내, 증거 자료 정리까지 단계별로 제공합니다. 정부·공공기관을 대리하지 않는 정보 서비스입니다.";

/** `app/opengraph-image.png`는 og:url에 쿼리가 붙을 수 있어, 카카오 등 일부 스크래퍼 호환을 위해 `public/og.png`만 사용 */
const ogImageAlt =
  "VoiceGuard — 보이스피싱·스미싱이 의심될 때 지금 바로 확인하고 대응하는 안내 화면";

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_BRAND}`,
  },
  description: ogDescription,
  metadataBase: siteUrl,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl.href,
    title: defaultTitle,
    description: ogDescription,
    siteName: SITE_BRAND,
    images: [
      {
        url: "/og.png",
        width: 1024,
        height: 665,
        type: "image/png",
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: ogDescription,
    images: ["/og.png"],
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
