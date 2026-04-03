import Link from "next/link";
import { ArrowRight, BadgeAlert, PhoneCall, ShieldAlert, Siren } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tiles = [
  {
    href: "/emergency/call",
    title: "의심 전화(통화 중/통화 후)",
    desc: "검찰·경찰·금감원·은행·카드사·택배 등을 사칭",
    icon: PhoneCall,
  },
  {
    href: "/emergency/link-clicked",
    title: "문자 링크를 눌렀어요",
    desc: "URL 클릭, 로그인/앱 설치 화면이 떴어요",
    icon: BadgeAlert,
  },
  {
    href: "/emergency/app-installed",
    title: "앱을 설치했어요",
    desc: "원격제어/보안앱/인증앱 설치 또는 접근권한 허용",
    icon: ShieldAlert,
  },
  {
    href: "/emergency/money-sent",
    title: "돈을 보냈어요",
    desc: "계좌 이체/현금 전달/상품권·가상자산 전송",
    icon: Siren,
  },
  {
    href: "/emergency/family-help",
    title: "가족이 당한 것 같아요",
    desc: "보호자가 개입해야 할 때(비난 없이 멈춤부터)",
    icon: PhoneCall,
  },
  {
    href: "/emergency/impersonation",
    title: "기관 사칭 같아요",
    desc: "검찰·경찰·금감원·은행·택배 등 권위 사칭",
    icon: ShieldAlert,
  },
  {
    href: "/emergency/device-check",
    title: "기기 점검이 필요해요",
    desc: "링크/앱 이후 스마트폰 점검",
    icon: BadgeAlert,
  },
];

export const metadata = {
  title: "긴급 대응 센터",
  description:
    "지금 5분 안에 해야 할 일, 절대 하지 말아야 할 일, 연락처 준비물, 증거 체크리스트를 상황별로 제공합니다.",
};

export default function EmergencyHubPage() {
  return (
    <SiteShell>
      <div className="flex flex-col gap-3">
        <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">
          긴급 대응 센터
        </h1>
        <p className="text-[15px] leading-7 text-muted-foreground">
          지금 상황을 고르세요. 각 페이지는 <b className="text-foreground">“5분 안에 해야 할 일”</b>
          을 맨 위에 보여줍니다.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {tiles.map((t) => (
          <Card key={t.href} className="hover:border-ring/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-brand">
                  <t.icon className="h-5 w-5" aria-hidden />
                </span>
                {t.title}
              </CardTitle>
              <CardDescription>{t.desc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild variant="danger" className="w-full rounded-xl">
                <Link href={t.href}>
                  지금 5분 대응 보기
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-surface p-5">
        <div className="text-[14px] font-semibold">중요 안내</div>
        <ul className="mt-2 space-y-2 text-[13px] leading-6 text-muted-foreground">
          <li>
            - 이 사이트는 <b className="text-foreground">공식기관이 아니며</b>, 실용 안내와 체크리스트를 제공합니다.
          </li>
          <li>
            - 상대가 주는 번호로 다시 연락하지 말고, <b className="text-foreground">내가 직접 찾은 공식 번호</b>로 확인하세요.
          </li>
          <li>
            - “앱 설치/원격제어/OTP 공유/송금” 요청은 고위험 신호입니다. 즉시 멈추고 대응하세요.
          </li>
        </ul>
      </div>
    </SiteShell>
  );
}

