import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { scenarioBySlug, scenarios } from "@/data/scenarios";
import { jsonLdStringify } from "@/lib/seo/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = scenarioBySlug.get(slug);
  if (!s) return { title: "찾을 수 없음" };
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: `/scams/${s.slug}` },
  };
}

export default async function ScamScenarioPage({ params }: Props) {
  const { slug } = await params;
  const s = scenarioBySlug.get(slug);
  if (!s) notFound();

  const related = s.relatedScams
    .map((rs) => scenarioBySlug.get(rs))
    .filter(Boolean);

  const faqJsonLd =
    s.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: s.title,
    description: s.shortSummary,
    dateModified: s.updatedAt,
    inLanguage: "ko-KR",
  };

  return (
    <SiteShell>
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdStringify(faqJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(articleJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/scams", label: "사기 유형" },
          { href: `/scams/${s.slug}`, label: s.title },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">{s.title}</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{s.shortSummary}</p>
        <div className="mt-3 text-[12px] text-muted-foreground">
          최종 업데이트: {s.updatedAt}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>한눈에 보는 위험 신호</CardTitle>
            <CardDescription>급하게 읽기 어렵다면 이 목록만이라도 확인하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-6">
            {s.dangerSigns.map((x) => (
              <div key={x} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" aria-hidden />
                <span>{x}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>지금 대처(요약)</CardTitle>
            <CardDescription>먼저 행동 → 그다음 정리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-[13px] font-semibold text-brand">즉시</div>
              <ul className="mt-2 space-y-2 text-[14px] leading-6">
                {s.immediateActions.slice(0, 4).map((x) => (
                  <li key={x}>- {x}</li>
                ))}
              </ul>
            </div>
            <ButtonRow />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>자주 쓰는 멘트</CardTitle>
            <CardDescription>비슷한 문장이 나오면 속도를 늦추세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-6">
            {s.commonScripts.map((x) => (
              <div key={x} className="rounded-2xl bg-muted p-3">
                “{x}”
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>절대 하지 말 것</CardTitle>
            <CardDescription>‘지금 당장’이 느껴질수록 위험합니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-6">
            {s.whatNotToDo.map((x) => (
              <div key={x} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" aria-hidden />
                <span>{x}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>증거 체크리스트</CardTitle>
            <CardDescription>/evidence 로 옮겨 적기 좋습니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-6">
            {s.evidenceChecklist.map((x) => (
              <div key={x}>- {x}</div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>부모님께 설명하는 쉬운 버전</CardTitle>
            <CardDescription>짧고 단호하게</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-6 text-muted-foreground">
            <p>
              “진짜 기관은 보통 전화로 비밀번호나 돈 보내라고 하지 않아요. 의심되면 끊고, 우리가
              직접 찾은 번호로 확인할게요.”
            </p>
            <p>
              “앱 설치/화면 보여주기/송금은 위험 신호예요. 먼저 멈추고 가족이랑 같이 확인해요.”
            </p>
          </CardContent>
        </Card>
      </div>

      {s.faq.length > 0 ? (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>자주 헷갈리는 질문</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {s.faq.map((f) => (
                  <AccordionItem key={f.id} value={f.id}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionContent>{f.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {related.length > 0 ? (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>비슷한 유형</CardTitle>
              <CardDescription>내부 링크로 주제를 확장합니다</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-2">
              {related.map((rs) =>
                rs ? (
                  <Link
                    key={rs.slug}
                    className="rounded-2xl border border-border bg-surface p-4 text-[14px] font-semibold hover:border-ring/60"
                    href={`/scams/${rs.slug}`}
                  >
                    {rs.title}
                  </Link>
                ) : null,
              )}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </SiteShell>
  );
}

function ButtonRow() {
  return (
    <div className="grid gap-2">
      <Link
        className="inline-flex h-11 items-center justify-center rounded-xl bg-danger px-4 text-[14px] font-semibold text-white"
        href="/emergency"
      >
        긴급 대응으로 이동
      </Link>
      <Link
        className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-[14px] font-semibold"
        href="/evidence"
      >
        증거 정리 시작
      </Link>
    </div>
  );
}
