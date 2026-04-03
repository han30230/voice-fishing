import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { LawFirmDirectoryClient } from "@/components/law/law-firm-directory-client";
import { NonGovernmentNotice, TrustBlock } from "@/components/trust/trust-block";
import { lawFirms } from "@/data/law-firms";
import { SITE_BRAND } from "@/lib/brand";

const pageTitle = "법률 도움 디렉터리";
const pageDesc =
  "공개적으로 확인 가능한 공식 사이트·사례·등록 조회 링크를 바탕으로 운영자가 정리한 참고용 법률 디렉터리입니다. 자동 추천·평점을 하지 않으며 결과를 보장하지 않습니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical: "/help/law-firms" },
  openGraph: {
    title: `${pageTitle} | ${SITE_BRAND}`,
    description: pageDesc,
    url: "/help/law-firms",
    type: "website",
  },
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

      <article className="mt-3">
        <header>
          <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">{pageTitle}</h1>
          <p className="mt-2 max-w-3xl text-pretty text-[15px] leading-7 text-muted-foreground">
            공개적으로 확인 가능한 공식 사이트·사례·등록 조회 링크를 바탕으로 운영자가 정리한{" "}
            <strong className="font-semibold text-foreground">참고용 디렉터리</strong>입니다. 특정
            로펌을 자동으로 추천하거나 순위·평점을 매기지 않습니다.
          </p>
        </header>

        <div className="mt-6 space-y-4">
          <NonGovernmentNotice />

          <TrustBlock variant="policy" title="이 페이지의 핵심 원칙">
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>자동 추천이나 평점·후기 생성을 하지 않습니다.</li>
              <li>환급, 승소, 수사 결과를 약속하거나 보장하지 않습니다.</li>
              <li>상담 전 대한변호사협회 등에서 등록·면허를 공식 조회하는 것을 권장합니다.</li>
              <li>계약 범위와 비용·환불 조건은 반드시 서면으로 확인하세요.</li>
            </ul>
          </TrustBlock>

          <p className="text-[13px] leading-6 text-muted-foreground">
            아래 목록 순서는 공개 자료의 확인 범위·페이지 노출 정도 등을 고려한{" "}
            <strong className="font-medium text-foreground">편집 순서</strong>이며, 우열·추천·평가를
            의미하지 않습니다.
          </p>
        </div>

        <div className="mt-8">
          <LawFirmDirectoryClient items={lawFirms} />
        </div>
      </article>
    </SiteShell>
  );
}
