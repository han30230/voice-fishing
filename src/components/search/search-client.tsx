"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { alerts } from "@/data/alerts";
import { learningArticles } from "@/data/learn";
import { recoveryGuides } from "@/data/recovery";
import { seoIntentPages } from "@/data/seo-intent-pages";
import { scenarios } from "@/data/scenarios";
import { trackEvent } from "@/lib/analytics";

type Hit = {
  title: string;
  href: string;
  snippet: string;
  kind: string;
};

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function SearchClient() {
  const [q, setQ] = useState("");

  const index = useMemo<Hit[]>(() => {
    return [
      ...scenarios.map((s) => ({
        kind: "사기 유형",
        title: s.title,
        href: `/scams/${s.slug}`,
        snippet: `${s.category} · ${s.shortSummary}`,
      })),
      ...recoveryGuides.map((g) => ({
        kind: "피해 회복",
        title: g.title,
        href: `/recovery/${g.slug}`,
        snippet: g.subtitle,
      })),
      ...alerts.map((a) => ({
        kind: "경보",
        title: a.title,
        href: `/alerts/${a.slug}`,
        snippet: a.summary,
      })),
      ...learningArticles.map((a) => ({
        kind: "학습",
        title: a.title,
        href: `/learn/${a.slug}`,
        snippet: a.summary,
      })),
      {
        kind: "도구",
        title: "스크립트 위험구문 탐지기",
        href: "/tools/script-detector",
        snippet: "문구를 붙여넣어 위험 패턴을 빠르게 확인",
      },
      {
        kind: "도구",
        title: "문자·카톡 의심 신호 체크",
        href: "/tools/suspicious-text",
        snippet: "규칙 기반 의심 신호(참고용)",
      },
      ...seoIntentPages.map((p) => ({
        kind: "상황별 가이드",
        title: p.title,
        href: `/guide/${p.slug}`,
        snippet: p.lead,
      })),
      { kind: "도움", title: "공식 연락처 허브", href: "/help/contacts", snippet: "번호 복사·공식 링크" },
      {
        kind: "도움",
        title: "전문 기관·법률 참고",
        href: "/help/institutions",
        snippet: "공공 출발점·변호사 선택 체크(추천 없음)",
      },
      {
        kind: "도움",
        title: "법률 도움 디렉터리(운영자 입력)",
        href: "/help/law-firms",
        snippet: "출처 기반으로만 관리",
      },
      { kind: "도움", title: "명의·2차 피해 예방", href: "/identity", snippet: "개통·명의 관련 점검" },
      { kind: "도움", title: "법률 도움(공공)", href: "/legal", snippet: "진술·자료 체크리스트" },
    ];
  }, []);

  const hits = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return [];
    return index
      .map((h) => {
        const hay = normalize(`${h.title} ${h.snippet}`);
        const score = hay.includes(nq) ? 2 : 0;
        return { h, score };
      })
      .filter((x) => x.score > 0)
      .slice(0, 30)
      .map((x) => x.h);
  }, [index, q]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="q">검색</Label>
        <Input
          id="q"
          value={q}
          placeholder="예: 앱 설치, 검찰, 택배 문자, 돈 보냄, 부모님…"
          onChange={(e) => {
            const next = e.target.value;
            setQ(next);
            if (next.trim().length >= 2) trackEvent("search.query", { q: next.trim() });
          }}
        />
        <div className="text-[12px] text-muted-foreground">
          내부 콘텐츠(유형/회복/학습/경보/상황별 가이드)를 빠르게 찾습니다.
        </div>
      </div>

      {q.trim().length === 0 ? (
        <div className="text-[14px] text-muted-foreground">검색어를 입력해보세요.</div>
      ) : hits.length === 0 ? (
        <div className="text-[14px] text-muted-foreground">
          결과가 없습니다. /check 또는 /emergency 로 이동해도 됩니다.
        </div>
      ) : (
        <ul className="space-y-2">
          {hits.map((h) => (
            <li key={h.href} className="rounded-2xl border border-border bg-surface p-4">
              <div className="text-[12px] font-semibold text-brand">{h.kind}</div>
              <Link className="mt-1 block text-[16px] font-semibold hover:underline" href={h.href}>
                {h.title}
              </Link>
              <div className="mt-1 text-[13px] leading-6 text-muted-foreground">{h.snippet}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
