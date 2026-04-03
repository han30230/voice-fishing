import type { Metadata } from "next";
import Link from "next/link";

import { OutboundLinkButton } from "@/components/help/phone-copy-row";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { NonGovernmentNotice, TrustBlock } from "@/components/trust/trust-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { identityProtectionItems } from "@/data/identity-protection";

export const metadata: Metadata = {
  title: "명의도용·2차 피해 예방 허브",
  description:
    "휴대폰 개통 확인, 신규 개통 제한, 개인정보·금융 관련 점검을 위한 ‘왜·무엇·어디’ 안내입니다.",
  alternates: { canonical: "/identity" },
};

export default function IdentityHubPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/identity", label: "명의·2차 피해" },
        ]}
      />

      <div className="mt-3 space-y-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">
          명의도용·2차 피해 예방
        </h1>
        <p className="text-[15px] leading-7 text-muted-foreground">
          같은 피해가 반복되지 않도록, <b className="text-foreground">확인 가능한 범위에서</b> 빠르게
          점검하는 것이 목적입니다. 모든 절차는 공식기관 안내가 우선입니다.
        </p>
        <NonGovernmentNotice />
      </div>

      <div className="mt-8 space-y-6">
        {identityProtectionItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-[17px]">{item.title}</CardTitle>
              <CardDescription>마지막 확인일: {item.verifiedAt}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[14px] leading-7">
              <div>
                <div className="text-[13px] font-semibold text-brand">왜 지금 해야 하나요</div>
                <p className="mt-1 text-muted-foreground">{item.whyNow}</p>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-brand">무엇이 필요한가요</div>
                <p className="mt-1 text-muted-foreground">{item.whatYouNeed}</p>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-brand">어디로 가야 하나요</div>
                <p className="mt-1 text-muted-foreground">{item.whereToGo}</p>
              </div>
              <OutboundLinkButton href={item.outboundUrl}>{item.outboundLabel}</OutboundLinkButton>
              {item.caution ? (
                <TrustBlock variant="disclaimer" title="유의사항">
                  {item.caution}
                </TrustBlock>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-[1.75rem] border border-border bg-surface/90 p-6">
        <div className="text-[16px] font-semibold">관련 바로가기</div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="danger" className="rounded-2xl">
            <Link href="/emergency">긴급 대응</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/help/contacts">공식 연락처</Link>
          </Button>
          <Button asChild variant="primary" className="rounded-2xl">
            <Link href="/guide/phone-subscription-check">내 명의 개통 확인(상황별 가이드)</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
