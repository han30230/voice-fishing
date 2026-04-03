import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { learningArticles, learningBySlug } from "@/data/learn";
import { jsonLdStringify } from "@/lib/seo/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return learningArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = learningBySlug.get(slug);
  if (!a) return { title: "찾을 수 없음" };
  return {
    title: a.seoTitle,
    description: a.seoDescription,
    alternates: { canonical: `/learn/${a.slug}` },
  };
}

export default async function LearningArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = learningBySlug.get(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.summary,
    dateModified: a.updatedAt,
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
          { href: "/learn", label: "학습" },
          { href: `/learn/${a.slug}`, label: a.title },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">{a.title}</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{a.summary}</p>
        <div className="mt-3 text-[12px] text-muted-foreground">업데이트: {a.updatedAt}</div>
      </div>

      <div className="mt-6 space-y-3 text-[15px] leading-7 text-muted-foreground">
        {a.body.map((p) => (
          <p key={p}>- {p}</p>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-surface p-5 text-[14px] leading-7 text-muted-foreground">
        다음으로{" "}
        <Link className="font-semibold text-brand hover:underline" href="/tools/script-detector">
          스크립트 탐지기
        </Link>
        로 실제 문구를 점검해보세요.
      </div>
    </SiteShell>
  );
}
