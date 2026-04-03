import Link from "next/link";
import { Laptop, Moon, ShieldAlert, Smartphone } from "lucide-react";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SiteShell } from "@/components/site/site-shell";
import { NonGovernmentNotice, TrustBlock } from "@/components/trust/trust-block";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <ul className="space-y-2 text-[14px] leading-6 text-foreground" aria-label={title}>
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function MaliciousAppEmergencyPage() {
  const oneMinute = [
    "가능하면 비행기 모드 또는 모바일 데이터·Wi‑Fi를 꺼 외부 연결을 잠시 끊습니다(상황에 맞게).",
    "원격제어·화면공유·보이스피싱 통화가 진행 중이면 즉시 종료합니다.",
    "설정에서 접근성·기기 관리자·알림 접근 등 의심 앱 권한을 해제한 뒤 앱 삭제를 시도합니다.",
    "금융·메일·메신저는 ‘다른 기기’에서 비밀번호 변경과 로그인 세션 종료를 검토합니다.",
  ];

  const today = [
    "금융 앱 알림·이상거래 문자가 있었는지 확인합니다.",
    "공식 백신/OS 업데이트 등 ‘공식’ 경로로만 점검을 고려합니다(낯선 ‘보안앱’ 추가 설치는 피합니다).",
    "필요하면 가족·지인 기기로 공식기관 사이트만 열어 안내를 확인합니다.",
    "증거(앱 이름, 권한 화면, 설치 시각)를 캡처해 /evidence 에 정리합니다.",
  ];

  const never = [
    "상대가 안내하는 추가 ‘보안점검’ 앱을 설치하지 않습니다.",
    "전화를 받으며 금융 앱 실행·OTP·보안카드 정보를 말하지 않습니다.",
    "‘삭제가 안 된다’고 방치하지 않고, 권한 해제·안전모드·제조사 안내 등 공식 절차를 찾습니다.",
  ];

  const otherDevice = [
    "은행·카드 공식 앱 또는 공식 번호(본인이 찾은 번호)로 이상거래·지급정지를 문의합니다.",
    "이메일 2단계 인증 등 계정 보호 설정을 ‘다른 기기’에서 점검합니다.",
    "초기화는 마지막 수단으로, 사진·연락처 백업 여부를 먼저 확인합니다.",
  ];

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { href: "/", label: "홈" },
          { href: "/emergency", label: "긴급 대응" },
          { href: "/emergency/app-installed", label: "악성앱·원격제어" },
        ]}
      />

      <div className="mt-3 space-y-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">
          악성앱·원격제어 앱을 설치했을 때
        </h1>
        <p className="text-[15px] leading-7 text-muted-foreground">
          기기 내부를 완전히 ‘깨끗하다’고 단정할 수는 없습니다. 대신{" "}
          <b className="text-foreground">연결을 끊고, 권한을 거두고, 계정을 보호</b>하는 순서가
          우선입니다.
        </p>
        <NonGovernmentNotice />
        <TrustBlock variant="source" title="기기 점검에 관하여">
          악성 여부는 앱·권한·네트워크 환경에 따라 다릅니다. 의심이 크면 제조사·통신사 공식
          안전점검을 참고하세요.
        </TrustBlock>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card className="border-danger/25">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[17px]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-danger/10 text-danger">
                <Smartphone className="h-5 w-5" aria-hidden />
              </span>
              지금 1분 안에 할 일
            </CardTitle>
            <CardDescription>먼저 흐름을 끊는 것이 목표입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckList title="1분 체크" items={oneMinute} />
          </CardContent>
        </Card>

        <Card className="border-brand/25">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[17px]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-muted text-brand">
                <Moon className="h-5 w-5" aria-hidden />
              </span>
              오늘 안에 할 일
            </CardTitle>
            <CardDescription>피해 확대 방지와 기록 정리</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckList title="오늘 체크" items={today} />
          </CardContent>
        </Card>

        <Card className="border-warning/25">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[17px]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-warning/15 text-warning">
                <ShieldAlert className="h-5 w-5" aria-hidden />
              </span>
              절대 하면 안 되는 일
            </CardTitle>
            <CardDescription>‘지금 당장’이 반복되면 더 의심하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckList title="금지" items={never} />
          </CardContent>
        </Card>

        <Card className="border-accent/25">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[17px]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-muted text-accent">
                <Laptop className="h-5 w-5" aria-hidden />
              </span>
              다른 기기로 해야 하는 일
            </CardTitle>
            <CardDescription>감염이 의심되는 기기에서만 처리하기 어려운 단계</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckList title="다른 기기" items={otherDevice} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="danger" className="rounded-2xl">
          <Link href="/emergency/money-sent">돈·이체가 있었다면(지급정지 순서)</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/help/contacts">공식 연락처 허브</Link>
        </Button>
        <Button asChild variant="primary" className="rounded-2xl">
          <Link href="/evidence">증거·타임라인 정리</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
