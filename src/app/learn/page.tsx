import Link from "next/link";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { learningArticles } from "@/data/learn";

export const metadata = {
  title: "학습 센터",
  description: "예방과 판단에 필요한 실전 지식을 짧게 정리합니다.",
};

export default function LearnIndexPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/learn", label: "학습" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">학습 센터</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          급하면 먼저 <Link className="font-semibold text-brand hover:underline" href="/emergency">긴급</Link>
          을 보고, 여유가 생기면 패턴을 익혀두면 좋습니다.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Card className="border-brand/20">
          <CardHeader>
            <CardTitle>스크립트 위험구문 탐지기</CardTitle>
            <CardDescription>문자/통화 내용을 붙여넣어 빨간 깃발을 확인</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Link className="text-[14px] font-semibold text-brand hover:underline" href="/tools/script-detector">
              열기
            </Link>
          </CardContent>
        </Card>

        {learningArticles.map((a) => (
          <Card key={a.slug}>
            <CardHeader>
              <CardTitle className="text-[16px]">{a.title}</CardTitle>
              <CardDescription>{a.summary}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link className="text-[14px] font-semibold text-brand hover:underline" href={`/learn/${a.slug}`}>
                읽기
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteShell>
  );
}
