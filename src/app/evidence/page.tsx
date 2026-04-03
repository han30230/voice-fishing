import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { EvidenceOrganizerClient } from "@/components/evidence/evidence-organizer-client";

export const metadata = {
  title: "증거 타임라인 정리",
  description:
    "회원가입 없이 내 기기에 임시 저장하며, 경찰/은행/가족 공유용 요약을 복사·인쇄할 수 있습니다.",
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
          지금 기억나는 것부터 적어도 됩니다. 완벽하지 않아도 상담에 큰 도움이 됩니다.
        </p>
      </div>

      <div className="mt-6">
        <EvidenceOrganizerClient />
      </div>
    </SiteShell>
  );
}
