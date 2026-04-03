import Link from "next/link";
import {
  ArrowRight,
  FileText,
  HeartHandshake,
  PhoneCall,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { HomeQuickTiles } from "@/components/home/home-quick-tiles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <SiteShell>
        <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface/90 p-6 shadow-[0_20px_60px_-24px_rgb(15_61_122/0.35)] ring-1 ring-white/60 md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgb(15_61_122/0.14),transparent_65%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgb(13_124_106/0.12),transparent_65%)]"
          />

          <div className="relative grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-muted/80 px-4 py-1.5 text-[12px] font-semibold text-brand shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              당황하지 마세요. 지금부터 5분 대응부터 함께합니다.
            </div>
            <h1 className="mt-5 text-balance text-[30px] font-bold leading-[1.15] tracking-tight text-foreground md:text-[42px]">
              보이스피싱·스미싱이 의심될 때,
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-brand via-[#0f5c8c] to-accent bg-clip-text text-transparent">
                지금 바로 확인하고 대응하세요.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-[16px] leading-8 text-muted-foreground md:text-[17px]">
              상황별로 <b className="font-semibold text-foreground">“다음 5분에 해야 할 일”</b>을
              먼저 안내하고, 피해 회복 체크리스트와 증거 정리(타임라인)까지 한
              번에 제공합니다.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="danger" size="lg" className="rounded-2xl px-6 shadow-lg">
                <Link href="/emergency">
                  <Siren className="h-5 w-5" aria-hidden />
                  지금 어떤 상황인가요?
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="primary" size="lg" className="rounded-2xl px-6">
                <Link href="/check">
                  <PhoneCall className="h-5 w-5" aria-hidden />
                  1분 자가진단 시작
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl px-6">
                <Link href="/family">
                  <Users className="h-5 w-5" aria-hidden />
                  부모님 보호 모드
                </Link>
              </Button>
            </div>

            <HomeQuickTiles
              tiles={[
                {
                  id: "call",
                  title: "이상한 전화 받음",
                  desc: "기관/은행/검찰·경찰 사칭 같아요",
                  href: "/emergency/call",
                  icon: "phone",
                },
                {
                  id: "link",
                  title: "문자 링크 클릭함",
                  desc: "URL 눌렀고 뭔가 설치/로그인이 떴어요",
                  href: "/emergency/link-clicked",
                  icon: "badge",
                },
                {
                  id: "app",
                  title: "앱 설치함",
                  desc: "원격제어/보안앱/인증앱을 설치했어요",
                  href: "/emergency/app-installed",
                  icon: "smartphone",
                },
                {
                  id: "money",
                  title: "돈 보냄",
                  desc: "송금/이체/현금 전달이 있었어요",
                  href: "/emergency/money-sent",
                  icon: "siren",
                },
                {
                  id: "family",
                  title: "가족이 당한 것 같음",
                  desc: "부모님/가족이 이상한 통화·송금을 하려 해요",
                  href: "/emergency/family-help",
                  icon: "users",
                },
                {
                  id: "impersonation",
                  title: "기관 사칭 같음",
                  desc: "검찰·경찰·금감원·은행·택배 등을 주장해요",
                  href: "/emergency/impersonation",
                  icon: "landmark",
                },
                {
                  id: "device",
                  title: "기기 점검이 필요",
                  desc: "링크/앱 이후 휴대폰을 점검하고 싶어요",
                  href: "/emergency/device-check",
                  icon: "shield",
                },
              ]}
            />
          </div>

          <div className="md:col-span-5">
            <Card className="border-brand/15 bg-gradient-to-b from-surface to-brand-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[17px]">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[#0a2d5c] text-white shadow-md shadow-brand/25">
                    <HeartHandshake className="h-5 w-5" aria-hidden />
                  </span>
                  3단계 기억 규칙
                </CardTitle>
                <CardDescription className="text-[14px]">
                  긴급 상황에서도 외우기 쉬운 기본 원칙
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-2xl border border-border/60 bg-surface/80 p-4 shadow-sm">
                  <div className="text-[13px] font-bold text-brand">1) 멈추기</div>
                  <div className="mt-1 text-[14px] leading-6 text-muted-foreground">
                    통화·대화·송금을 즉시 멈추고, 화면 공유/원격제어를 끊으세요.
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-surface/80 p-4 shadow-sm">
                  <div className="text-[13px] font-bold text-brand">2) 확인하기</div>
                  <div className="mt-1 text-[14px] leading-6 text-muted-foreground">
                    상대가 준 번호가 아니라{" "}
                    <b className="text-foreground">내가 아는 공식 번호</b>로 다시
                    연락해 확인하세요.
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-surface/80 p-4 shadow-sm">
                  <div className="text-[13px] font-bold text-brand">3) 보호하기</div>
                  <div className="mt-1 text-[14px] leading-6 text-muted-foreground">
                    문자/링크/계좌/앱 목록/통화기록을 저장하고, 필요한 곳에 신고
                    준비를 하세요.
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-brand/25 bg-gradient-to-br from-accent-muted/60 to-transparent p-4">
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-foreground">
                    <FileText className="h-4 w-4 text-accent" aria-hidden />
                    증거 정리 도구(로컬 저장)
                  </div>
                  <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
                    회원가입 없이, 내 기기에서만 임시 저장하며 사건 타임라인을
                    출력/복사할 수 있어요.
                  </p>
                  <div className="mt-3">
                    <Button asChild variant="primary" className="w-full rounded-xl">
                      <Link href="/evidence">
                        증거 타임라인 만들기
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "긴급 대응 센터",
              desc: "상황별 5분 행동, 절대 금지, 연락/증거 체크",
              href: "/emergency",
            },
            {
              title: "피해 회복 센터",
              desc: "첫 10분·1시간·오늘·7일 체크리스트",
              href: "/recovery",
            },
            {
              title: "사기 유형 라이브러리",
              desc: "자주 쓰는 멘트, 진행 순서, 가족에게 설명",
              href: "/scams",
            },
          ].map((c) => (
            <Card key={c.href} className="flex flex-col">
              <CardHeader className="flex-1">
                <CardTitle className="text-[18px]">{c.title}</CardTitle>
                <CardDescription className="text-[14px] leading-relaxed">{c.desc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="outline" className="w-full rounded-2xl">
                  <Link href={c.href}>
                    자세히 보기
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-border/80 bg-surface/90 p-6 shadow-[0_12px_40px_-20px_rgb(15_61_122/0.2)] md:p-8">
          <div className="text-[16px] font-bold text-foreground">투명한 안내</div>
          <p className="mt-2 text-[14px] leading-7 text-muted-foreground">
            이 사이트는 실용적 대응 가이드와 공식 도움 채널로의 연결을 제공합니다.
            정부/경찰/금융기관을 사칭하지 않으며, 법적/금전적 결과를 보장하지
            않습니다. 긴급 위험이 있거나 즉시 조치가 필요하면 공식 기관에 먼저
            연락하세요.
          </p>
        </section>
    </SiteShell>
  );
}
