import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert } from "lucide-react";

import { EvidenceOrganizerClient } from "@/components/evidence/evidence-organizer-client";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "증거 타임라인 정리",
  description:
    "회원가입 없이 내 기기에 임시 저장하며, 경찰·금융기관·가족 공유용 요약을 복사·인쇄할 수 있습니다. 서버 전송 없음.",
  alternates: { canonical: "/evidence" },
  openGraph: {
    title: `증거 타임라인 정리 | ${SITE_BRAND}`,
    description:
      "통화·문자·송금·앱 설치 사실을 시간순으로 정리하고, 신고·상담 제출용 문안을 일괄 복사할 수 있습니다.",
    url: "/evidence",
  },
};

export default function EvidencePage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/evidence", label: "증거 정리" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">증거 타임라인 정리</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          지금 기억나는 것부터 적어도 됩니다. 완벽하지 않아도 상담·신고 준비에 큰 도움이 됩니다.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="border-brand/15 bg-brand-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[15px]">
              <ShieldAlert className="h-4 w-4 text-brand" aria-hidden />
              개인정보·저장 방식
            </CardTitle>
            <CardDescription className="text-[13px] leading-6">
              입력 내용은{" "}
              <b className="font-medium text-foreground">이 브라우저(기기) 안에만</b> 저장됩니다. 서버로
              전송하지 않습니다. 공용 PC·남의 휴대폰에서는 사용을 자제하세요.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[15px]">
              <FileText className="h-4 w-4 text-accent" aria-hidden />
              이렇게 활용하세요
            </CardTitle>
            <CardDescription className="text-[13px] leading-6">
              번호·링크·이체를 적은 뒤, “보내기” 단계에서 경찰·은행·가족용 문장을 복사하거나 인쇄할 수
              있습니다. 공식 연락처는{" "}
              <Link href="/help/contacts" className="font-medium text-brand underline-offset-2 hover:underline">
                공식 연락처
              </Link>
              에서 확인하세요.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-6">
        <EvidenceOrganizerClient />
      </div>
    </SiteShell>
  );
}
