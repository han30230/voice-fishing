import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recoveryBySlug, recoveryGuides } from "@/data/recovery";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return recoveryGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = recoveryBySlug.get(slug);
  if (!g) return { title: "찾을 수 없음" };
  return {
    title: g.seoTitle,
    description: g.seoDescription,
    alternates: { canonical: `/recovery/${g.slug}` },
  };
}

function Phase({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[16px]">{title}</CardTitle>
        <CardDescription>체크만 하며 진행하세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-[14px] leading-6">
        {items.map((x) => (
          <div key={x} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
            <span>{x}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default async function RecoveryGuidePage({ params }: Props) {
  const { slug } = await params;
  const g = recoveryBySlug.get(slug);
  if (!g) notFound();

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/recovery", label: "피해 회복" },
          { href: `/recovery/${g.slug}`, label: g.title },
        ]}
      />

      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">{g.title}</h1>
          <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{g.subtitle}</p>
        </div>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-[14px] font-semibold"
          href="/evidence"
        >
          증거 타임라인 정리
        </Link>
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-surface p-5 text-[14px] leading-7 text-muted-foreground">
        <b className="text-foreground">감정적으로 힘든 점</b>도 흔합니다. {g.emotionalNote}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Phase title="첫 10분" items={g.first10Minutes} />
        <Phase title="첫 1시간" items={g.firstHour} />
        <Phase title="오늘 안에" items={g.today} />
        <Phase title="다음 7일" items={g.next7Days} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>이후 모니터링</CardTitle>
            <CardDescription>이상 징후가 있으면 다시 /check</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-6">
            {g.monitorAfter.map((x) => (
              <div key={x}>- {x}</div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>체크리스트(증거/상담용)</CardTitle>
            <CardDescription>가능한 것부터 체크</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-6">
            {g.checklist.map((x) => (
              <div key={x}>- {x}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}
