"use client";

import Link from "next/link";
import { useEffect } from "react";

import { SITE_BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export default function EvidenceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("evidence page error", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-surface/90 px-4 py-3">
        <Link href="/" className="text-[14px] font-semibold text-foreground">
          ← {SITE_BRAND} 홈
        </Link>
      </header>
      <div className="mx-auto max-w-lg px-4 py-10">
      <h2 className="text-[20px] font-semibold tracking-tight text-foreground">
        증거 페이지를 불러오지 못했습니다
      </h2>
      <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
        일시적인 오류이거나, 브라우저·저장 공간 설정 때문에 일어날 수 있습니다. 아래를 눌러 다시 시도하거나,
        잠시 후 다시 열어 주세요.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button type="button" variant="primary" className="rounded-xl" onClick={() => reset()}>
          다시 시도
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/">홈으로</Link>
        </Button>
      </div>
      <p className="mt-6 text-[12px] text-muted-foreground">
        문제가 반복되면, 사파리·크롬을 최신으로 올리거나, 사이트 데이터(쿠키)가 아닌 다른 기기에서
        열어 보는 것도 도움이 됩니다.
      </p>
      </div>
    </div>
  );
}
