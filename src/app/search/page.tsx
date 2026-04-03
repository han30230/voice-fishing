import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { SearchClient } from "@/components/search/search-client";

export const metadata = {
  title: "검색",
  description: "사기 유형, 회복 가이드, 학습 글, 경보를 키워드로 빠르게 찾습니다.",
};

export default function SearchPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/search", label: "검색" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">검색</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          “이거 사기인가요?”가 급하면 <b className="text-foreground">1분 자가진단</b>이 더 빠를 수 있어요.
        </p>
      </div>

      <div className="mt-6">
        <SearchClient />
      </div>
    </SiteShell>
  );
}
