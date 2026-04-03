import type { Metadata } from "next";
import Link from "next/link";

import { OutboundLinkButton, PhoneCopyRow } from "@/components/help/phone-copy-row";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { NonGovernmentNotice, TrustBlock } from "@/components/trust/trust-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  disclaimerInstitutionPage,
  lawFirmSelectionChecklist,
  publicInstitutions,
} from "@/data/institution-references";

export const metadata: Metadata = {
  title: "전문 기관·법률 도움 참고",
  description:
    "보이스피싱·스미싱 대응에 참고할 공공 기관과, 변호사 선택 시 점검할 항목을 중립적으로 안내합니다.",
  alternates: { canonical: "/help/institutions" },
};

export default function InstitutionsReferencePage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/help", label: "공식 도움" },
          { href: "/help/institutions", label: "전문 기관·법률 참고" },
        ]}
      />

      <div className="mt-3 space-y-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">
          보이스피싱 대응 전문 기관·법률 도움 참고
        </h1>
        <p className="text-[15px] leading-7 text-muted-foreground">
          아래는 <b className="text-foreground">공식·공공에 가까운 출발점</b>입니다. 민간 법무법인
          ‘추천 순위’나 ‘별점’은 제공하지 않으며, 선택은 본인 책임입니다.
        </p>
        <NonGovernmentNotice />
        <TrustBlock variant="disclaimer" title={disclaimerInstitutionPage.title}>
          {disclaimerInstitutionPage.body.map((p) => (
            <p key={p} className="mt-2 first:mt-0">
              {p}
            </p>
          ))}
        </TrustBlock>
      </div>

      <section className="mt-10" aria-labelledby="public-h">
        <h2 id="public-h" className="text-[20px] font-semibold">
          공공·준공공 기관(참고)
        </h2>
        <p className="mt-2 text-[14px] text-muted-foreground">
          연락처는 공지 변경이 잦습니다. 반드시 공식 사이트에서 최신 번호를 확인하세요.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {publicInstitutions.map((org) => (
            <Card key={org.id}>
              <CardHeader>
                <CardTitle className="text-[17px]">{org.name}</CardTitle>
                <CardDescription>{org.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-[14px] leading-6">
                {org.phone ? <PhoneCopyRow label="대표 안내 번호(참고)" phone={org.phone} /> : null}
                <OutboundLinkButton href={org.link}>{org.linkLabel}</OutboundLinkButton>
                <p className="text-muted-foreground">{org.note}</p>
                <p className="text-[12px] text-muted-foreground">확인일 {org.verifiedAt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="law-h">
        <h2 id="law-h" className="text-[20px] font-semibold">
          법무법인·변호사 선택은 어떻게 하나요?
        </h2>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          이 사이트는 <b className="text-foreground">특정 로펌을 소개하지 않습니다</b>. 아래는 스스로
          점검할 때 쓰는 중립 체크리스트입니다.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>선택 전 체크리스트</CardTitle>
            <CardDescription>체크만으로도 실수를 줄일 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-[15px] leading-7 text-muted-foreground">
              {lawFirmSelectionChecklist.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="outline" className="rounded-2xl">
                <a href="https://www.klac.or.kr" target="_blank" rel="noopener noreferrer">
                  법률구조공단 공식 사이트
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl">
                <a href="https://www.koreanbar.or.kr" target="_blank" rel="noopener noreferrer">
                  대한변호사협회(면허·정보 확인)
                </a>
              </Button>
            </div>
            <p className="mt-4 text-[12px] leading-5 text-muted-foreground">
              위 링크는 참고용입니다. 도메인을 직접 확인하고, 검색 광고만 믿지 마세요.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6 border-dashed">
          <CardHeader>
            <CardTitle className="text-[16px]">‘평점·후기’는 왜 없나요?</CardTitle>
            <CardDescription>조작·광고와의 이해충돌을 피하기 위함입니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-7 text-muted-foreground">
            <p>
              온라인 별점만으로는 실제 수임 품질을 검증하기 어렵고, 피해자에게 오히려 잘못된 선택을
              유도할 수 있습니다.
            </p>
            <p>
              공공기관의 민원 처리 만족도·공시 정보 등은 각 기관 <b className="text-foreground">공식 공지</b>를
              참고하세요. 이 페이지에 ‘OO 로펌 5점’ 같은 표기는 넣지 않습니다.
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="mt-10 flex flex-wrap gap-2">
        <Button asChild variant="primary" className="rounded-2xl">
          <Link href="/help/contacts">공식 연락처 허브</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/legal">법률 도움(공공·체크리스트)</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/evidence">증거·타임라인 정리</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
