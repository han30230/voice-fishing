import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { LawFirmDirectoryClient } from "@/components/law/law-firm-directory-client";
import { lawFirms } from "@/data/law-firms";

export const metadata: Metadata = {
  title: "법률 도움 디렉터리(운영자 입력)",
  description:
    "보이스피싱 사건 관련 법률 도움 연결을 위한 운영자 입력형 디렉터리입니다. 추천·순위·별점은 출처가 있는 경우에만 운영자가 직접 입력하세요.",
  alternates: { canonical: "/help/law-firms" },
};

export default function LawFirmsPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/help", label: "공식 도움" },
          { href: "/help/law-firms", label: "법률 디렉터리" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">
          법률 도움 디렉터리(운영자 입력)
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          이 페이지는 <b className="text-foreground">특정 변호사/로펌을 자동 추천하지 않습니다</b>. 운영자가
          검증한 출처 링크 중심으로만 관리하세요.
        </p>
      </div>

      <div className="mt-6">
        <LawFirmDirectoryClient items={lawFirms} />
      </div>
    </SiteShell>
  );
}

