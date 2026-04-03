"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { OutboundLinkButton, PhoneCopyRow } from "@/components/help/phone-copy-row";
import { TrustBlock } from "@/components/trust/trust-block";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KOREAN_BAR_OFFICIAL_LOOKUP } from "@/data/law-firms";
import type { LawFirmEntry } from "@/schemas/domain";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function SourceLink({ label, url, context }: { label: string; url: string; context: string }) {
  const aria = `${context} 관련 출처: ${label}(새 창)`;
  return (
    <li className="pl-0">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand underline underline-offset-2 hover:text-brand-hover"
        aria-label={aria}
      >
        {label}
      </a>
    </li>
  );
}

function LawFirmCard({ entry: x }: { entry: LawFirmEntry }) {
  const lookup = x.officialLookup ?? KOREAN_BAR_OFFICIAL_LOOKUP;

  return (
    <Card className="overflow-hidden border-border/80 shadow-sm">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-[17px] leading-snug sm:text-[18px]">{x.name}</CardTitle>
              <span
                className="inline-flex shrink-0 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground"
                title="조직 유형"
              >
                {x.organizationType}
              </span>
            </div>
            <CardDescription className="text-[13px] leading-6">
              <span className="text-foreground/90">{x.region}</span>
              <span className="mx-1.5 text-border">·</span>
              <time dateTime={x.verifiedAt}>확인일 {x.verifiedAt}</time>
            </CardDescription>
          </div>
        </div>
        {x.specialties.length ? (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              주요 분야
            </div>
            <ul className="mt-1.5 flex flex-wrap gap-1.5" aria-label="주요 분야">
              {x.specialties.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-brand/15 bg-brand-muted/50 px-2 py-0.5 text-[12px] font-medium text-brand"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4 text-[14px] leading-7">
        <section aria-labelledby={`summary-${x.id}`}>
          <h3 id={`summary-${x.id}`} className="sr-only">
            요약
          </h3>
          <div className="rounded-2xl border border-border bg-surface/80 p-4 text-muted-foreground">
            <div className="text-[12px] font-semibold text-foreground">요약</div>
            <p className="mt-2 text-pretty">{x.summary}</p>
          </div>
        </section>

        <div className="md:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="detail" className="border-0">
              <AccordionTrigger className="py-3 text-[14px] font-semibold text-foreground hover:no-underline">
                확인 포인트·출처·등록 조회·유의사항
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-1">
                <LawFirmCardDetailSections entry={x} lookup={lookup} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="hidden space-y-4 md:block">
          <LawFirmCardDetailSections entry={x} lookup={lookup} />
        </div>
      </CardContent>
    </Card>
  );
}

function LawFirmCardDetailSections({
  entry: x,
  lookup,
}: {
  entry: LawFirmEntry;
  lookup: { label: string; url: string };
}) {
  return (
    <>
      <section aria-labelledby={`highlights-${x.id}`}>
        <h3 id={`highlights-${x.id}`} className="text-[13px] font-semibold text-foreground">
          확인된 포인트
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
          {x.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby={`sources-${x.id}`}
        className="rounded-2xl border border-border bg-muted/30 p-4"
      >
        <h3 id={`sources-${x.id}`} className="text-[13px] font-semibold text-foreground">
          출처 보기
        </h3>
        <p className="mt-1 text-[12px] text-muted-foreground">
          아래 링크는 운영자가 확인한 공개 페이지입니다. 새 탭에서 열립니다.
        </p>
        <ul className="mt-3 space-y-2">
          {x.sources.map((s) => (
            <SourceLink key={`${s.label}-${s.url}`} label={s.label} url={s.url} context={x.name} />
          ))}
        </ul>
      </section>

      <section
        aria-labelledby={`registry-${x.id}`}
        className="rounded-2xl border border-brand/20 bg-brand-muted/30 p-4"
      >
        <h3 id={`registry-${x.id}`} className="text-[13px] font-semibold text-foreground">
          공식 등록 조회
        </h3>
        <p className="mt-1 text-[12px] text-muted-foreground">
          상담 전 대한변협 등에서 등록·면허 정보를 직접 확인하세요.
        </p>
        <ul className="mt-3 space-y-2">
          <SourceLink label={lookup.label} url={lookup.url} context="대한변협 등 공식 조회" />
        </ul>
      </section>

      {x.phone ? (
        <PhoneCopyRow label="공식 사이트 등에서 확인한 연락처" phone={x.phone} />
      ) : null}
      {x.website ? (
        <OutboundLinkButton href={x.website}>
          {x.name} 공식 사이트 열기
        </OutboundLinkButton>
      ) : null}

      <section
        aria-labelledby={`cautions-${x.id}`}
        className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 text-[13px] leading-6 text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/25 dark:text-amber-50"
      >
        <h3 id={`cautions-${x.id}`} className="font-semibold text-foreground">
          상담 전 체크사항
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {x.cautions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function LawFirmDirectoryClient({ items }: { items: LawFirmEntry[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("all");

  const regions = useMemo(() => {
    const set = new Set(items.map((x) => x.region).filter(Boolean));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b, "ko"))];
  }, [items]);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    return items.filter((x) => {
      if (region !== "all" && x.region !== region) return false;
      if (!nq) return true;
      const hay = normalize(
        [
          x.name,
          x.region,
          x.organizationType,
          x.specialties.join(" "),
          x.summary,
          x.highlights.join(" "),
          x.tags.join(" "),
          x.cautions.join(" "),
        ].join(" "),
      );
      return hay.includes(nq);
    });
  }, [items, q, region]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="law-q">키워드 검색</Label>
          <Input
            id="law-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="이름, 지역, 분야, 보이스피싱, 민사 등"
            autoComplete="off"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="law-region">지역 필터</Label>
          <select
            id="law-region"
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[15px] shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "전체 지역" : r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-[13px] text-muted-foreground" role="status" aria-live="polite">
        현재 <span className="font-semibold text-foreground">{filtered.length}</span>개 항목이 표시됩니다.
        (전체 {items.length}개 중 검색·필터 결과)
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((x) => (
          <LawFirmCard key={x.id} entry={x} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center text-[14px] text-muted-foreground">
          조건에 맞는 항목이 없습니다. 검색어나 지역 필터를 바꿔 보세요.
        </p>
      ) : null}

      <TrustBlock variant="disclaimer" title="공통 면책·신뢰 안내">
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>이 디렉터리는 자동 추천·평판 생성 서비스가 아닙니다.</li>
          <li>공개 출처에서 확인한 사실 범위만 반영했으며, 사건 결과·환급·수사기관 연결 등을 보장하지 않습니다.</li>
          <li>상담 전 대한변협 등 공식 등록 조회를 먼저 확인하세요.</li>
          <li>비용, 수임 범위, 환불 조건은 반드시 서면으로 확인하세요.</li>
        </ul>
      </TrustBlock>

      <div className="rounded-[1.75rem] border border-border bg-surface/90 p-6">
        <h2 className="text-[16px] font-semibold">다음 단계</h2>
        <p className="mt-2 text-[14px] leading-7 text-muted-foreground">
          법률 상담 전에 사실관계와 증거를 정리해 두면 상담이 수월합니다. 아래 링크는 이 사이트 안내입니다.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="primary" className="rounded-2xl">
            <Link href="/evidence">증거·타임라인 정리</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/legal">법률 절차·체크리스트 안내</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
