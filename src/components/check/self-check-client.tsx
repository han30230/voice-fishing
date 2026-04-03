"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { selfCheckQuestions } from "@/data/self-check";
import { trackEvent } from "@/lib/analytics";
import { runSelfCheck } from "@/lib/self-check/engine";
import type { SelfCheckResult } from "@/schemas/domain";

function RiskBadge({ category }: { category: SelfCheckResult["riskCategory"] }) {
  const label =
    category === "low_concern"
      ? "낮은 우려"
      : category === "suspicious"
        ? "의심"
        : category === "high_risk"
          ? "고위험"
          : category === "immediate_action_required"
            ? "즉시 조치"
            : "진행형 가능성 큼";

  const cls =
    category === "low_concern"
      ? "bg-muted text-foreground"
      : category === "suspicious"
        ? "bg-warning/15 text-warning"
        : category === "high_risk"
          ? "bg-danger/10 text-danger"
          : "bg-danger text-white";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold ${cls}`}>
      {label}
    </span>
  );
}

export function SelfCheckClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SelfCheckResult | null>(null);

  useEffect(() => {
    trackEvent("self_check.start");
  }, []);

  const q = selfCheckQuestions[step];
  const progress = Math.round(((step + (result ? 1 : 0)) / selfCheckQuestions.length) * 100);

  const canNext = useMemo(() => Boolean(answers[q?.id ?? ""]), [answers, q]);

  return (
    <div className="grid gap-4 md:grid-cols-5 md:items-start">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>질문 {step + 1}/{selfCheckQuestions.length}</CardTitle>
          <CardDescription>모르겠으면 ‘잘 모르겠어요’를 선택해도 됩니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-[12px] text-muted-foreground">진행률 {progress}%</div>

          {!result ? (
            <>
              <div>
                <div className="text-[16px] font-semibold leading-7">{q.prompt}</div>
                {q.helpText ? (
                  <div className="mt-2 text-[13px] leading-6 text-muted-foreground">{q.helpText}</div>
                ) : null}
              </div>

              <div className="grid gap-2">
                {q.options.map((o) => {
                  const selected = answers[q.id] === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      className={[
                        "rounded-2xl border px-4 py-3 text-left text-[14px] leading-6",
                        selected ? "border-brand bg-muted" : "border-border bg-background hover:bg-muted/60",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
                      ].join(" ")}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: o.id }))}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  이전
                </Button>

                <div className="flex flex-col gap-2 sm:flex-row">
                  {step < selfCheckQuestions.length - 1 ? (
                    <Button
                      type="button"
                      className="rounded-xl"
                      disabled={!canNext}
                      onClick={() => setStep((s) => s + 1)}
                    >
                      다음
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="danger"
                      className="rounded-xl"
                      disabled={!canNext}
                      onClick={() => {
                        const r = runSelfCheck(selfCheckQuestions, answers);
                        setResult(r);
                        trackEvent("self_check.complete", {
                          riskScore: r.riskScore,
                          riskCategory: r.riskCategory,
                          primaryType: r.primarySuspectedType,
                        });
                      }}
                    >
                      결과 보기
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <RiskBadge category={result.riskCategory} />
                <div className="text-[14px] text-muted-foreground">
                  점수 <span className="font-semibold text-foreground">{result.riskScore}</span>/100
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-4 text-[14px] leading-7 text-muted-foreground">
                {result.explanation}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-muted p-4">
                  <div className="text-[13px] font-semibold text-brand">추정 유형</div>
                  <div className="mt-1 text-[14px] font-semibold">{result.primarySuspectedType}</div>
                </div>
                <div className="rounded-2xl bg-muted p-4">
                  <div className="text-[13px] font-semibold text-brand">캡처된 신호</div>
                  <div className="mt-1 text-[12px] leading-5 text-muted-foreground">
                    {result.triggeredFlags.length ? result.triggeredFlags.join(", ") : "(없음)"}
                  </div>
                </div>
              </div>

              <div>
                <Label>지금 할 일</Label>
                <ul className="mt-2 space-y-2 text-[14px] leading-6">
                  {result.immediateActionPlan.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Label>공식 도움 준비</Label>
                <ul className="mt-2 space-y-2 text-[14px] leading-6 text-muted-foreground">
                  {result.officialHelpRecommendation.map((x) => (
                    <li key={x}>- {x}</li>
                  ))}
                </ul>
              </div>

              <div>
                <Label>증거 체크</Label>
                <ul className="mt-2 space-y-2 text-[14px] leading-6 text-muted-foreground">
                  {result.evidenceChecklist.map((x) => (
                    <li key={x}>- {x}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <Button asChild variant="danger" className="rounded-xl">
                  <Link href="/emergency">긴급 대응</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/evidence">증거 정리</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/help">공식 도움</Link>
                </Button>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => {
                  setResult(null);
                  setStep(0);
                  setAnswers({});
                  trackEvent("self_check.restart");
                }}
              >
                다시 하기
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>팁</CardTitle>
          <CardDescription>정확한 ‘판정’보다 안전한 행동이 우선입니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[13px] leading-6 text-muted-foreground">
          <p>- 통화 중이면 끊어도 됩니다. 예의가 아니라 안전 문제입니다.</p>
          <p>- 상대가 준 번호는 믿지 말고, 내가 찾은 공식 앱/번호로 확인하세요.</p>
          <p>- 결과가 낮아도 불안하면 /help 와 /emergency 를 함께 보세요.</p>
        </CardContent>
      </Card>
    </div>
  );
}
