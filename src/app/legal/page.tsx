import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { NonGovernmentNotice, TrustBlock } from "@/components/trust/trust-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  legalDistinctions,
  legalHelpIntro,
  statementChecklist,
  submissionMaterialsChecklist,
} from "@/data/legal-help";
import { OutboundLinkButton } from "@/components/help/phone-copy-row";

export const metadata: Metadata = {
  title: "법률 도움(공공 지원·사실정리)",
  description:
    "형사·민사·서류 준비를 구분하고, 공공 법률지원과 증거·진술 체크리스트로 연결합니다.",
  alternates: { canonical: "/legal" },
};

export default function LegalHelpPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/legal", label: "법률 도움" },
        ]}
      />

      <div className="mt-3 space-y-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">{legalHelpIntro.title}</h1>
        <div className="space-y-2 text-[15px] leading-7 text-muted-foreground">
          {legalHelpIntro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <NonGovernmentNotice />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {legalDistinctions.map((d) => (
          <Card key={d.id}>
            <CardHeader>
              <CardTitle className="text-[16px]">{d.title}</CardTitle>
              <CardDescription>{d.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-[14px] leading-6 text-muted-foreground">
                {d.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>공공 법률지원(출발점)</CardTitle>
            <CardDescription>자격·절차는 기관 안내가 정확합니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-[14px] leading-7 text-muted-foreground">
            <p>
              대한민국 <b className="text-foreground">법률구조공단</b> 등 공익 지원 제도가 있습니다. 승인
              여부·범위는 심사 결과에 따릅니다.
            </p>
            <OutboundLinkButton href="https://www.klac.or.kr">법률구조공단 공식 사이트 열기</OutboundLinkButton>
            <TrustBlock variant="source" verifiedAt="2026-04-03" title="확인 기준">
              링크는 편의용입니다. 도메인이 공식인지 주소창에서 확인하세요. [TODO: 운영자 검증]
            </TrustBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>사건 정리 템플릿 연결</CardTitle>
            <CardDescription>로컬 저장·복사·인쇄</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-[14px] leading-7 text-muted-foreground">
              시간·번호·금액·문자 원문을 한곳에 모으면 상담·신고 준비에 도움이 됩니다.
            </p>
            <Button asChild variant="primary" className="w-full rounded-2xl">
              <Link href="/evidence">증거·타임라인 도구로 이동</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>진술 정리 체크리스트</CardTitle>
            <CardDescription>빠뜨리기 쉬운 항목</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-[14px] leading-6">
              {statementChecklist.map((x) => (
                <li key={x} className="flex gap-2 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>제출용 자료 체크리스트</CardTitle>
            <CardDescription>개인정보는 필요한 최소만</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-[14px] leading-6">
              {submissionMaterialsChecklist.map((x) => (
                <li key={x} className="flex gap-2 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/help/contacts">공식 연락처 허브</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/recovery">피해 회복 가이드</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
