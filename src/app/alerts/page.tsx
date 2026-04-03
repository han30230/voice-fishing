import Link from "next/link";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { alerts } from "@/data/alerts";

export const metadata = {
  title: "최신 경보·트렌드",
  description: "최근 많이 신고되는 유형과 시즌형 스미싱 신호를 짧게 정리합니다.",
};

export default function AlertsPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/alerts", label: "경보" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">최신 경보</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          트렌드는 빠르게 바뀝니다. 불안하면 <b className="text-foreground">긴급</b> 또는{" "}
          <b className="text-foreground">1분 자가진단</b>을 병행하세요.
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        {alerts.map((a) => (
          <Card key={a.slug}>
            <CardHeader>
              <CardTitle className="text-[16px]">{a.title}</CardTitle>
              <CardDescription>
                {a.publishedAt} · {a.tags.join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 text-[14px] leading-6 text-muted-foreground">
              {a.summary}{" "}
              <Link className="font-semibold text-brand hover:underline" href={`/alerts/${a.slug}`}>
                자세히
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteShell>
  );
}
