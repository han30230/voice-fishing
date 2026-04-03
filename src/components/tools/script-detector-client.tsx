"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { compileSuspiciousRules, suspiciousTextRules } from "@/data/suspicious-text-rules";
import { trackEvent } from "@/lib/analytics";
import { NonGovernmentNotice } from "@/components/trust/trust-block";

function countMatches(text: string, p: RegExp) {
  const flags = p.flags.includes("g") ? p : new RegExp(p.source, `${p.flags}g`);
  const m = text.match(flags);
  return m?.length ?? 0;
}

export function ScriptDetectorClient() {
  const [text, setText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const compiled = useMemo(() => compileSuspiciousRules(suspiciousTextRules), []);

  const hits = useMemo(() => {
    const t = text;
    return compiled
      .map((f) => {
        let score = 0;
        for (const p of f.patterns) score += countMatches(t, p);
        return { rule: f, score };
      })
      .filter((x) => x.score > 0);
  }, [compiled, text]);

  function runCheck() {
    setAnalyzed(true);
    trackEvent("suspicious_text.analyze", { length: text.trim().length, hitCount: hits.length });
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>문자·카톡 내용 붙여넣기</CardTitle>
          <CardDescription>
            개인정보는 가능하면 가리고(계좌/주민번호 등), 패턴 위주로 붙여넣으세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="script">내용</Label>
            <Textarea
              id="script"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="예: 지금 당장 앱 설치하세요. 가족에게 말하지 마세요. 안전계좌로 이체…"
              className="min-h-[160px]"
            />
          </div>
          <Button
            type="button"
            className="w-full rounded-xl"
            onClick={runCheck}
          >
            의심 신호 확인하기
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => {
              setText("");
              setAnalyzed(false);
              trackEvent("suspicious_text.clear");
            }}
          >
            지우기
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>의심 신호 체크 결과</CardTitle>
          <CardDescription>
            규칙 기반 참고용입니다. 최종 판단은 공식기관·공식 절차에서 확인하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <NonGovernmentNotice />
          {!analyzed ? (
            <div className="text-[14px] leading-7 text-muted-foreground">
              내용을 붙여넣고 <b className="text-foreground">의심 신호 확인하기</b>를 눌러주세요.
            </div>
          ) : hits.length === 0 ? (
            <div className="space-y-3 text-[14px] leading-7 text-muted-foreground">
              <p>자동 규칙에서 뚜렷한 패턴이 잡히지 않았습니다. 그래도 불안하면 /check 로 점검하세요.</p>
              <p>
                <b className="text-foreground">지금 해야 할 행동:</b> 링크 클릭·추가 송금·앱 설치를 멈추고 공식
                앱으로 거래를 확인하세요.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-2xl border border-brand/20 bg-brand-muted/40 p-3 text-[14px] font-semibold text-foreground">
                위험 신호 요약: {hits.length}종류 패턴이 검출되었습니다(참고).
              </div>
              {hits
                .slice()
                .sort((a, b) => b.score - a.score)
                .map(({ rule, score }) => (
                  <div key={rule.id} className="rounded-2xl border border-border bg-surface p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[14px] font-semibold">{rule.label}</div>
                      <div className="text-[12px] text-muted-foreground">매칭 {score}회</div>
                    </div>
                    {rule.why ? (
                      <div className="mt-2 text-[13px] text-muted-foreground">
                        <span className="font-medium text-foreground">왜 의심되는지: </span>
                        {rule.why}
                      </div>
                    ) : null}
                    <div className="mt-2 text-[13px] leading-6 text-muted-foreground">{rule.advice}</div>
                  </div>
                ))}
              <p className="text-[12px] leading-5 text-muted-foreground">
                단정적 ‘탐지’가 아니라, 빠른 자가 점검을 돕기 위한 휴리스틱입니다.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
