import Link from "next/link";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { ScriptDetectorClient } from "@/components/tools/script-detector-client";

export const metadata = {
  title: "문자·카톡 의심 신호 체크",
  description:
    "문구를 붙여넣어 기관 사칭·링크·송금·긴급 압박 등 의심 신호를 규칙 기반으로 짚어봅니다. 참고용이며 최종 판단은 공식 확인이 필요합니다.",
  alternates: { canonical: "/tools/suspicious-text" },
};

export default function SuspiciousTextToolPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/tools/suspicious-text", label: "의심 신호 체크" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">문자·카톡 의심 신호 체크</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          AI가 아니라 <b className="text-foreground">정해진 규칙</b>으로 흔한 패턴을 찾습니다.{" "}
          <Link className="font-semibold text-brand underline" href="/tools/script-detector">
            이전 페이지명(스크립트 탐지)
          </Link>
          과 동일한 도구입니다.
        </p>
      </div>

      <div className="mt-6">
        <ScriptDetectorClient />
      </div>
    </SiteShell>
  );
}
