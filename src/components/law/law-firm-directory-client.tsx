"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { OutboundLinkButton, PhoneCopyRow } from "@/components/help/phone-copy-row";
import { NonGovernmentNotice, TrustBlock } from "@/components/trust/trust-block";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LawFirmEntry } from "@/schemas/domain";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function LawFirmDirectoryClient({ items }: { items: LawFirmEntry[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("all");

  const regions = useMemo(() => {
    const set = new Set(items.map((x) => x.region).filter(Boolean) as string[]);
    return ["all", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    return items.filter((x) => {
      if (region !== "all" && (x.region ?? "") !== region) return false;
      if (!nq) return true;
      const hay = normalize(
        `${x.name} ${x.region ?? ""} ${x.specialties.join(" ")} ${x.operatorSummary ?? ""} ${x.reputationSummary ?? ""}`,
      );
      return hay.includes(nq);
    });
  }, [items, q, region]);

  return (
    <div className="space-y-6">
      <NonGovernmentNotice />
      <TrustBlock variant="disclaimer" title="중요 안내">
        이 페이지는 <b className="text-foreground">운영자가 입력한 디렉터리</b>입니다. 이 서비스가 특정
        사무실/변호사를 자동 추천하거나, 별점·후기를 임의로 생성하지 않습니다. 별점·평판을
        제공하려면 <b className="text-foreground">출처 링크</b>를 함께 제공하세요.
      </TrustBlock>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="law-q">검색</Label>
          <Input
            id="law-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="예: 지역, ‘형사’, ‘민사’, ‘보이스피싱’…"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="law-region">지역</Label>
          <select
            id="law-region"
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[15px] shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "전체" : r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-[13px] text-muted-foreground">{filtered.length}개 항목</div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((x) => (
          <Card key={x.id}>
            <CardHeader>
              <CardTitle className="text-[17px]">{x.name}</CardTitle>
              <CardDescription>
                {x.region ? `${x.region} · ` : ""}
                확인일 {x.verifiedAt}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-[14px] leading-7">
              {x.specialties.length ? (
                <div>
                  <div className="text-[13px] font-semibold text-brand">주요 분야(운영자 입력)</div>
                  <div className="mt-1 text-muted-foreground">{x.specialties.join(" · ")}</div>
                </div>
              ) : null}

              {x.operatorSummary ? (
                <div className="rounded-2xl border border-border bg-surface p-4 text-muted-foreground">
                  <div className="text-[13px] font-semibold text-foreground">운영자 요약(출처 기반)</div>
                  <div className="mt-1">{x.operatorSummary}</div>
                </div>
              ) : null}

              {x.reputationSummary || x.ratingNote ? (
                <TrustBlock variant="source" title="평판·후기·별점(출처 필요)">
                  {x.reputationSummary ? <p className="mt-1">{x.reputationSummary}</p> : null}
                  {x.ratingNote ? <p className="mt-1">{x.ratingNote}</p> : null}
                  {x.sources.length ? (
                    <ul className="mt-2 list-disc pl-5">
                      {x.sources.map((s) => (
                        <li key={`${s.label}-${s.url}`}>
                          <a className="font-semibold text-brand underline" href={s.url} target="_blank" rel="noopener noreferrer">
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-[12px] text-muted-foreground">
                      출처가 없으면 별점/후기는 표시하지 마세요.
                    </p>
                  )}
                </TrustBlock>
              ) : null}

              {x.phone ? <PhoneCopyRow label="대표번호(공식 확인 후)" phone={x.phone} /> : null}
              {x.website ? <OutboundLinkButton href={x.website}>공식 사이트 열기</OutboundLinkButton> : null}
              {x.registryUrl ? (
                <OutboundLinkButton href={x.registryUrl}>등록·면허 정보(공식 조회)</OutboundLinkButton>
              ) : null}

              {x.cautionNote ? (
                <TrustBlock variant="disclaimer" title="유의사항">
                  {x.cautionNote}
                </TrustBlock>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-border bg-surface/90 p-6">
        <div className="text-[16px] font-semibold">다음 단계</div>
        <p className="mt-2 text-[14px] leading-7 text-muted-foreground">
          법률 상담 전에 사실관계·증거가 정리되어 있으면 상담 품질이 크게 좋아집니다.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="primary" className="rounded-2xl">
            <Link href="/evidence">증거·타임라인 정리</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/legal">법률 도움(공공·체크리스트)</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

