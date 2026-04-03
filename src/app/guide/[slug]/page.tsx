import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { NonGovernmentNotice, TrustBlock } from "@/components/trust/trust-block";
import { Button } from "@/components/ui/button";
import { seoIntentBySlug, seoIntentPages } from "@/data/seo-intent-pages";
import { jsonLdStringify } from "@/lib/seo/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoIntentPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = seoIntentBySlug.get(slug);
  if (!p) return { title: "찾을 수 없음" };
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/guide/${p.slug}` },
  };
}

export default async function GuideIntentPage({ params }: Props) {
  const { slug } = await params;
  const p = seoIntentBySlug.get(slug);
  if (!p) notFound();

  const faqJsonLd =
    p.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: p.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const related = p.relatedSlugs
    .map((s) => seoIntentBySlug.get(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <SiteShell>
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdStringify(faqJsonLd) }}
        />
      ) : null}

      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/guide", label: "상황별 가이드" },
          { href: `/guide/${p.slug}`, label: p.title },
        ]}
      />

      <article className="mt-3 space-y-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">{p.h1}</h1>
        <p className="text-[15px] leading-7 text-muted-foreground">{p.lead}</p>
        <NonGovernmentNotice />
        <TrustBlock variant="verified" verifiedAt={p.verifiedAt} title="콘텐츠 확인일">
          정책·절차는 변경될 수 있습니다. 중요한 결정은 공식기관 확인을 권장합니다.
        </TrustBlock>
      </article>

      <div className="mt-8 space-y-8">
        {p.sections.map((s) => (
          <section key={s.heading} aria-labelledby={`h-${s.heading}`}>
            <h2 id={`h-${s.heading}`} className="text-[18px] font-semibold">
              {s.heading}
            </h2>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-muted-foreground">
              {s.body.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {p.faq.length > 0 ? (
        <section className="mt-10" aria-labelledby="faq-h">
          <h2 id="faq-h" className="text-[18px] font-semibold">
            자주 묻는 질문
          </h2>
          <dl className="mt-4 space-y-4">
            {p.faq.map((f) => (
              <div key={f.id} className="rounded-2xl border border-border bg-surface p-4">
                <dt className="font-semibold text-foreground">{f.question}</dt>
                <dd className="mt-2 text-[14px] leading-7 text-muted-foreground">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <div className="mt-10 flex flex-col gap-3 rounded-[1.75rem] border border-danger/20 bg-danger/5 p-6 sm:flex-row sm:flex-wrap">
        <Button asChild variant="danger" className="rounded-2xl">
          <Link href="/emergency">긴급 대응으로</Link>
        </Button>
        <Button asChild variant="primary" className="rounded-2xl">
          <Link href="/check">1분 자가진단</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/help/contacts">공식 연락처</Link>
        </Button>
      </div>

      {related.length > 0 ? (
        <section className="mt-10" aria-labelledby="rel-h">
          <h2 id="rel-h" className="text-[16px] font-semibold">
            함께 보면 좋은 글
          </h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link className="text-[15px] font-semibold text-brand hover:underline" href={`/guide/${r.slug}`}>
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </SiteShell>
  );
}
