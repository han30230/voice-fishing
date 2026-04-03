import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { NonGovernmentNotice } from "@/components/trust/trust-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { seoIntentPages } from "@/data/seo-intent-pages";

export const metadata: Metadata = {
  title: "상황별 가이드",
  description:
    "검색으로 많이 찾는 상황별 대응 요약. 공식 절차는 기관 안내가 우선입니다.",
  alternates: { canonical: "/guide" },
};

export default function GuideIndexPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/guide", label: "상황별 가이드" },
        ]}
      />

      <div className="mt-3 space-y-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">상황별 가이드</h1>
        <p className="text-[15px] leading-7 text-muted-foreground">
          긴급한 경우 <Link className="font-semibold text-brand underline" href="/emergency">긴급 대응</Link>
          과 함께 보세요.
        </p>
        <NonGovernmentNotice />
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {seoIntentPages.map((p) => (
          <Card key={p.slug} className="hover:border-brand/30">
            <CardHeader>
              <CardTitle className="text-[16px]">
                <Link href={`/guide/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-2">{p.lead}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 text-[12px] text-muted-foreground">
              확인일 {p.verifiedAt}
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteShell>
  );
}
