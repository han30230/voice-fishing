import Link from "next/link";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recoveryGuides } from "@/data/recovery";

export const metadata = {
  title: "피해 회복 센터",
  description:
    "이미 진행된 일이 있어도 지금 조치하면 추가 피해를 줄일 수 있습니다. 시간대별 체크리스트로 안내합니다.",
};

export default function RecoveryIndexPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/recovery", label: "피해 회복" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">피해 회복 센터</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          당황스러울 수 있지만, 지금부터 차근차근 하면 됩니다. 아래에서 상황에 가장 가까운 항목을
          선택하세요.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {recoveryGuides.map((g) => (
          <Card key={g.slug} className="hover:border-ring/60">
            <CardHeader>
              <CardTitle className="text-[16px]">{g.title}</CardTitle>
              <CardDescription>{g.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link
                className="text-[14px] font-semibold text-brand hover:underline"
                href={`/recovery/${g.slug}`}
              >
                회복 플랜 보기
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteShell>
  );
}
