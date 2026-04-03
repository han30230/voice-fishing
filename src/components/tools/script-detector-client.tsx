"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

type Flag = { id: string; label: string; patterns: RegExp[]; advice: string };

const FLAGS: Flag[] = [
  {
    id: "urgency",
    label: "긴급/즉시 압박",
    patterns: [/지금\s*당장/g, /10분\s*안에/g, /즉시/g, /마감/g],
    advice: "시간 압박이 강할수록 판단을 멈추고 공식 채널로 확인하세요.",
  },
  {
    id: "secrecy",
    label: "비밀/고립 유도",
    patterns: [/가족(?:에게)?\s*말하지\s*마/g, /비밀로/g, /아무에게도/g],
    advice: "주변에 알리지 말라는 요구는 대표적인 조종 신호입니다.",
  },
  {
    id: "authority",
    label: "권위 사칭 톤",
    patterns: [/검찰/g, /경찰/g, /금감원/g, /금융감독원/g, /수사/g, /계좌\s*동결/g],
    advice: "권위를 내세워도 통화로 민감정보/송금을 요구하면 매우 위험합니다.",
  },
  {
    id: "app_remote",
    label: "앱/원격/화면공유",
    patterns: [/앱\s*설치/g, /원격/g, /화면\s*공유/g, /(?:팀뷰어|AnyDesk|애니데스크)/i],
    advice: "원격제어는 사실상 ‘내 폰을 넘기는 것’에 가깝습니다. 즉시 중단하세요.",
  },
  {
    id: "link",
    label: "링크/인증 유도",
    patterns: [/http/g, /bit\.ly|tinyurl|me2\.kr/gi, /로그인/g, /본인\s*인증/g],
    advice: "문자 링크 로그인은 피싱의 전형입니다. 공식 앱으로 확인하세요.",
  },
  {
    id: "money",
    label: "송금/안전계좌/수수료",
    patterns: [/송금/g, /이체/g, /안전\s*계좌/g, /수수료/g, /보증금/g, /환불/g],
    advice: "‘안전계좌’·추가 송금은 강한 위험 신호입니다.",
  },
  {
    id: "otp",
    label: "OTP/비밀번호",
    patterns: [/OTP/g, /인증번호/g, /비밀번호/g, /보안카드/g],
    advice: "민감정보는 전화/문자로 요구받는 순간 거의 항상 이상 징후입니다.",
  },
];

function countMatches(text: string, p: RegExp) {
  const flags = p.flags.includes("g") ? p : new RegExp(p.source, `${p.flags}g`);
  const m = text.match(flags);
  return m?.length ?? 0;
}

export function ScriptDetectorClient() {
  const [text, setText] = useState("");

  const hits = useMemo(() => {
    const t = text;
    return FLAGS.map((f) => {
      let score = 0;
      for (const p of f.patterns) score += countMatches(t, p);
      return { flag: f, score };
    }).filter((x) => x.score > 0);
  }, [text]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>문구 붙여넣기</CardTitle>
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
            />
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => {
              setText("");
              trackEvent("script_detector.clear");
            }}
          >
            지우기
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>탐지 결과</CardTitle>
          <CardDescription>자동 분석은 참고용이며, 최종 판단은 공식 확인이 필요합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {hits.length === 0 ? (
            <div className="text-[14px] leading-7 text-muted-foreground">
              아직 뚜렷한 패턴이 잡히지 않았어요. 그래도 불안하면 /check 로 점검하세요.
            </div>
          ) : (
            <div className="space-y-3">
              {hits
                .slice()
                .sort((a, b) => b.score - a.score)
                .map(({ flag, score }) => (
                  <div key={flag.id} className="rounded-2xl border border-border bg-surface p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[14px] font-semibold">{flag.label}</div>
                      <div className="text-[12px] text-muted-foreground">매칭 {score}회</div>
                    </div>
                    <div className="mt-2 text-[13px] leading-6 text-muted-foreground">
                      {flag.advice}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
