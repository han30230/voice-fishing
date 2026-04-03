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
  "보이스피싱·스미싱 의심 시 선제적 조치, 공공·금융기관 등 공식 신고·상담 절차 안내, 증거 자료 정리까지 단계별로 제공합니다. 정부·공공기관을 대리하지 않는 정보 서비스입니다.";

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
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: ogDescription,
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
