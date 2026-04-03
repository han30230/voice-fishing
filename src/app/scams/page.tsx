import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ScamsLibraryClient } from "@/components/scams/scams-library-client";
import { SiteShell } from "@/components/site/site-shell";
import { scenarios } from "@/data/scenarios";

export const metadata = {
  title: "사기 유형 라이브러리",
  description:
    "기관사칭, 스미싱, 원격제어 앱, 송금유도 등 상황별 특징·대응·가족 설명까지 한 번에 확인합니다.",
};

export default function ScamsIndexPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/scams", label: "사기 유형" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">
          사기 유형 라이브러리
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          글을 먼저 읽기 어렵다면, 상단 메뉴의 <b className="text-foreground">긴급</b> 또는{" "}
          <b className="text-foreground">1분 자가진단</b>부터 시작해도 됩니다.
        </p>
      </div>

      <div className="mt-8">
        <ScamsLibraryClient scenarios={scenarios} />
      </div>
    </SiteShell>
  );
}
