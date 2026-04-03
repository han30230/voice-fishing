import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { SelfCheckClient } from "@/components/check/self-check-client";
import { jsonLdStringify } from "@/lib/seo/jsonld";

export const metadata = {
  title: "1분 자가진단",
  description:
    "8개 질문으로 위험 신호를 점수화하고, 왜 그렇게 분류됐는지 설명합니다. 즉시 행동 플랜과 증거 체크를 함께 제공합니다.",
};

export default function CheckPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "자가진단 결과가 낮은데도 불안해요",
        acceptedAnswer: {
          "@type": "Answer",
          text: "불안하면 공식 채널로 확인하는 것이 가장 안전합니다. 이 도구는 참고용입니다.",
        },
      },
    ],
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(faqJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/check", label: "자가진단" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">1분 자가진단</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          답은 정답이 아니라 <b className="text-foreground">위험 신호 수집</b>입니다. 통화 중이면 먼저 끊고
          천천히 진행해도 됩니다.
        </p>
      </div>

      <div className="mt-6">
        <SelfCheckClient />
      </div>
    </SiteShell>
  );
}
