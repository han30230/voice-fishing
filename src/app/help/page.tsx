import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { helpResources } from "@/data/help";

export const metadata = {
  title: "공식 도움 허브",
  description:
    "긴급 신고, 스미싱 상담, 스팸 신고, 금융기관 문의 전 준비물을 구조화해 안내합니다. (연락처는 운영자 검증 후 입력)",
};

export default function HelpHubPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/help", label: "공식 도움" },
        ]}
      />

      <div className="mt-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">공식 도움 허브</h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          이 페이지는 <b className="text-foreground">공식기관을 대체하지 않습니다</b>. 정확한 번호/절차는
          항상 공식 사이트에서 확인하세요. 여기서는 <b className="text-foreground">준비물과 판단 기준</b>을
          정리합니다.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {helpResources.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <CardTitle className="text-[16px]">{r.name}</CardTitle>
              <CardDescription>{r.purpose}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-[14px] leading-6">
              <div>
                <div className="text-[13px] font-semibold text-brand">언제 쓰나요</div>
                <div className="mt-1 text-muted-foreground">{r.whenToUse}</div>
              </div>

              <div>
                <div className="text-[13px] font-semibold text-brand">연락 전 준비물</div>
                <ul className="mt-2 space-y-2">
                  {r.prepareBeforeContact.map((x) => (
                    <li key={x} className="flex gap-2 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-muted p-4 text-muted-foreground">
                <div className="text-[13px] font-semibold text-foreground">운영 메모</div>
                <div className="mt-1">{r.operatingNotes}</div>
              </div>

              {r.phonePlaceholder ? (
                <div className="rounded-2xl border border-border p-4">
                  <div className="text-[13px] font-semibold">연락처(플레이스홀더)</div>
                  <div className="mt-1 font-mono text-[13px] text-muted-foreground">
                    {r.phonePlaceholder}
                  </div>
                </div>
              ) : null}

              <div className="text-[12px] leading-5 text-muted-foreground">{r.disclaimer}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteShell>
  );
}
