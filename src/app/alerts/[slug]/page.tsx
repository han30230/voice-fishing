import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { alertBySlug, alerts } from "@/data/alerts";
import { jsonLdStringify } from "@/lib/seo/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return alerts.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = alertBySlug.get(slug);
  if (!a) return { title: "찾을 수 없음" };
  return {
    title: a.seoTitle,
    description: a.seoDescription,
    alternates: { canonical: `/alerts/${a.slug}` },
  };
}

export default async function AlertDetailPage({ params }: Props) {
  const { slug } = await params;
  const a = alertBySlug.get(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    datePublished: a.publishedAt,
    inLanguage: "ko-KR",
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/alerts", label: "경보" },
          { href: `/alerts/${a.slug}`, label: a.title },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">{a.title}</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{a.summary}</p>
        <div className="mt-3 text-[12px] text-muted-foreground">
          게시: {a.publishedAt} · 태그: {a.tags.join(", ")}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-[16px]">지금 할 일</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-6 text-muted-foreground">
            <p>- 추가 설치/송금/로그인을 멈추세요.</p>
            <p>- 공식 앱/공식 번호로 재확인하세요.</p>
            <p>- 증거를 남기세요(문자/통화/URL).</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[16px]">바로가기</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild variant="danger" className="rounded-xl">
              <Link href="/emergency">긴급 대응</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/check">1분 자가진단</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/evidence">증거 정리</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}
