import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { FamilyModeClient } from "@/components/family/family-mode-client";

export const metadata = {
  title: "가족/어르신 보호 모드",
  description:
    "큰 글씨/단순 화면, 거대 긴급 버튼, 인쇄용 한 장 체크리스트로 가정 내 예방과 개입을 돕습니다.",
};

export default function FamilyPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/family", label: "가족/어르신" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">가족/어르신 보호 모드</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          이 화면은 <b className="text-foreground">부모님께 그대로 보여주기</b> 좋게 만들었습니다. 위에서 큰 글씨를 켜보세요.
        </p>
      </div>

      <div className="mt-6">
        <FamilyModeClient />
      </div>
    </SiteShell>
  );
}
