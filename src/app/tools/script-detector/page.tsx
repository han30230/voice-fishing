import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { ScriptDetectorClient } from "@/components/tools/script-detector-client";

export const metadata = {
  title: "스크립트 위험구문 탐지기",
  description: "문자/통화 스크립트에서 긴급성·비밀·권위·앱설치·송금 등 위험 신호를 빠르게 표시합니다.",
};

export default function ScriptDetectorPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/learn", label: "학습" },
          { href: "/tools/script-detector", label: "스크립트 탐지" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">스크립트 위험구문 탐지기</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          이 도구는 <b className="text-foreground">판결을 내리지 않습니다</b>. 대신 흔한 사기 문구 패턴을
          빠르게 짚어드립니다.
        </p>
      </div>

      <div className="mt-6">
        <ScriptDetectorClient />
      </div>
    </SiteShell>
  );
}
