import Link from "next/link";
import { ArrowLeft, ClipboardCheck, PhoneCall, ShieldAlert } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type EmergencyPageProps = {
  title: string;
  subtitle: string;
  next5Min: string[];
  neverDo: string[];
  whoToContact: { title: string; details: string }[];
  evidence: string[];
  extraChecks: string[];
};

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[14px] leading-6">
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function EmergencyPage(props: EmergencyPageProps) {
  return (
    <SiteShell>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight md:text-[34px]">
            {props.title}
          </h1>
          <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
            {props.subtitle}
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/emergency">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            목록
          </Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="border-danger/25">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-danger">
                <ClipboardCheck className="h-5 w-5" aria-hidden />
              </span>
              지금 5분 안에 해야 할 일
            </CardTitle>
            <CardDescription>추가 피해를 막는 데 가장 중요한 단계</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-foreground">
            <List items={props.next5Min} />
          </CardContent>
        </Card>

        <Card className="border-warning/25">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-warning">
                <ShieldAlert className="h-5 w-5" aria-hidden />
              </span>
              절대 하지 말아야 할 일
            </CardTitle>
            <CardDescription>사기꾼이 “지금 당장”을 유도합니다</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-foreground">
            <List items={props.neverDo} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-brand">
                <PhoneCall className="h-5 w-5" aria-hidden />
              </span>
              누구에게 연락할지
            </CardTitle>
            <CardDescription>공식 채널로 “내가 직접” 확인</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Accordion type="single" collapsible>
              {props.whoToContact.map((c) => (
                <AccordionItem key={c.title} value={c.title}>
                  <AccordionTrigger>{c.title}</AccordionTrigger>
                  <AccordionContent>{c.details}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-4 text-[12px] leading-5 text-muted-foreground">
              실제 서비스에서는 공식 번호/링크를 운영자가 검증 후 입력하도록 구성하는
              것을 권장합니다.
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>저장할 증거</CardTitle>
            <CardDescription>기억이 흐려지기 전에 캡처/기록</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-foreground">
            <List items={props.evidence} />
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href="/evidence">증거 타임라인 정리하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>추가 점검</CardTitle>
            <CardDescription>오늘 안에 확인하면 좋은 것</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-foreground">
            <List items={props.extraChecks} />
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}

