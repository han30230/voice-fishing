import type { Metadata } from "next";

import { OutboundLinkButton, PhoneCopyRow } from "@/components/help/phone-copy-row";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { NonGovernmentNotice, TrustBlock } from "@/components/trust/trust-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { officialContactHub } from "@/data/official-contacts";

export const metadata: Metadata = {
  title: "공식 연락처 허브",
  description:
    "경찰·금융·통신·카드·법률 공공지원 등 공식 채널로 연결하기 위한 준비 페이지입니다. 번호는 반드시 공식 사이트에서 재확인하세요.",
  alternates: { canonical: "/help/contacts" },
};

export default function OfficialContactsPage() {
  const { groups, pageVerifiedAt, globalCaution } = officialContactHub;

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/help", label: "공식 도움" },
          { href: "/help/contacts", label: "공식 연락처" },
        ]}
      />

      <div className="mt-3 space-y-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">공식 연락처 허브</h1>
        <p className="text-[15px] leading-7 text-muted-foreground">
          긴급 상황에서는 <b className="text-foreground">본인이 아는 공식 앱·공식 사이트</b>로만
          확인하세요. 아래 번호는 편의를 위해 모았으며, 절차·번호는 언제든 바뀔 수 있습니다.
        </p>
        <NonGovernmentNotice />
        <TrustBlock variant="verified" verifiedAt={pageVerifiedAt} title="페이지 기준일">
          {globalCaution}
        </TrustBlock>
      </div>

      <div className="mt-8 space-y-8">
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`grp-${g.id}`}>
            <h2 id={`grp-${g.id}`} className="text-[18px] font-semibold">
              {g.title}
            </h2>
            {g.description ? (
              <p className="mt-1 text-[14px] text-muted-foreground">{g.description}</p>
            ) : null}
            {g.sourceNote ? (
              <TrustBlock variant="source" className="mt-3" sourceLabel={g.sourceNote}>
                정책은 기관 공지가 우선입니다.
              </TrustBlock>
            ) : null}

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {g.entries.map((e) => (
                <Card key={e.id}>
                  <CardHeader>
                    <CardTitle className="text-[16px]">{e.label}</CardTitle>
                    <CardDescription>
                      {e.organization} · {e.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-[14px] leading-6">
                    <p className="text-muted-foreground">{e.description}</p>
                    <PhoneCopyRow label={e.label} phone={e.phone} />
                    {e.link ? (
                      <OutboundLinkButton href={e.link}>공식 사이트 열기</OutboundLinkButton>
                    ) : null}
                    {e.hours ? (
                      <div className="text-[12px] text-muted-foreground">운영: {e.hours}</div>
                    ) : null}
                    <p className="text-[12px] leading-5 text-muted-foreground">
                      <span className="font-medium text-foreground">마지막 확인일:</span> {e.verifiedAt}
                      {e.cautionNote ? ` — ${e.cautionNote}` : " — 최신 연락처는 공식 사이트에서 확인하세요."}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteShell>
  );
}
