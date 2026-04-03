"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

const K_LARGE = "ansymcall.family.largeText.v1";
const K_SIMPLE = "ansymcall.family.simpleUi.v1";

export function FamilyModeClient() {
  const [largeText, setLargeText] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(K_LARGE) === "1";
  });
  const [simpleUi, setSimpleUi] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(K_SIMPLE) === "1";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("elder-large", largeText);
    localStorage.setItem(K_LARGE, largeText ? "1" : "0");
  }, [largeText]);

  useEffect(() => {
    localStorage.setItem(K_SIMPLE, simpleUi ? "1" : "0");
    document.documentElement.classList.toggle("simple-ui", simpleUi);
  }, [simpleUi]);

  useEffect(() => {
    trackEvent("family.mode_toggle", { elderLargeText: largeText, simpleUi });
  }, [largeText, simpleUi]);

  const checklist = useMemo(
    () => [
      "낯선 전화는 짧게 끊기(‘지금 바로’가 나오면 더 의심)",
      "문자 링크는 누르지 않기",
      "앱 설치/화면 보여주기는 거절하기",
      "돈 보내라는 말이 나오면 가족에게 먼저 이야기하기",
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>표시 설정</CardTitle>
          <CardDescription>어르신에게 보여줄 때 큰 글씨/단순 화면을 켜보세요.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 text-[14px] font-semibold">
            큰 글씨 모드
            <input
              type="checkbox"
              checked={largeText}
              onChange={(e) => setLargeText(e.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 text-[14px] font-semibold">
            단순 화면(설명 최소)
            <input
              type="checkbox"
              checked={simpleUi}
              onChange={(e) => setSimpleUi(e.target.checked)}
            />
          </label>
        </CardContent>
      </Card>

      {!simpleUi ? (
        <Card>
          <CardHeader>
            <CardTitle>가족이 먼저 알아두면 좋은 신호</CardTitle>
            <CardDescription>부모님이 통화 중일 때 의심되는 패턴</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-7 text-muted-foreground">
            <p>- 문 밖으로 나가 통화하려 함 / 누구에게도 말하지 말라고 함</p>
            <p>- 갑자기 은행 앱을 켜거나 OTP를 물어봄</p>
            <p>- “앱 설치” “원격” 같은 단어가 대화에 자주 등장</p>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-3 md:grid-cols-3">
        <Button asChild variant="danger" className="h-16 rounded-3xl text-[16px]">
          <Link href="/emergency">지금 긴급</Link>
        </Button>
        <Button asChild variant="outline" className="h-16 rounded-3xl text-[16px]">
          <Link href="/check">1분 진단</Link>
        </Button>
        <Button asChild variant="outline" className="h-16 rounded-3xl text-[16px]">
          <Link href="/help">공식 도움</Link>
        </Button>
      </div>

      <Card className="print-friendly">
        <CardHeader>
          <CardTitle>한 장 체크리스트(인쇄)</CardTitle>
          <CardDescription>냉장고에 붙여두기 좋습니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-2 text-[15px] leading-8">
            {checklist.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <Button type="button" variant="outline" className="w-full rounded-xl" onClick={() => window.print()}>
            인쇄하기
          </Button>
        </CardContent>
      </Card>

      {!simpleUi ? (
        <Card>
          <CardHeader>
            <CardTitle>부모님이 숨기려 할 때</CardTitle>
            <CardDescription>비난하지 말고 안전부터</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[14px] leading-7 text-muted-foreground">
            <p>- “누가 잘못했는지”보다 “지금 멈추자”로 시작하세요.</p>
            <p>- 휴대폰을 빼앗기보다, 같이 은행 앱에서 최근 거래를 확인하세요.</p>
            <p>- 필요하면 /evidence 로 사실관계를 함께 정리하세요.</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
