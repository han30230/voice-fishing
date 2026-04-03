"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  buildBankSummary,
  buildChronologicalSummary,
  buildConciseSummary,
  buildFamilySummary,
  buildLawyerSummary,
  buildReportSummary,
  buildTimelineText,
} from "@/lib/evidence/summary";
import { emptyDraft } from "@/lib/evidence/storage";
import { useEvidenceDraft } from "@/hooks/use-evidence-draft";
import { trackEvent } from "@/lib/analytics";
import type { TimelineEntry } from "@/schemas/domain";

type StepKey = "basics" | "contacts" | "content" | "money" | "timeline" | "details" | "export";

const STEPS: { key: StepKey; title: string; desc: string }[] = [
  { key: "basics", title: "기본 정보", desc: "사건 제목·시각·피해자 유형" },
  { key: "contacts", title: "번호/링크", desc: "발신번호·URL 등" },
  { key: "content", title: "문자/메모", desc: "메시지 원문과 추가 메모" },
  { key: "money", title: "송금/앱", desc: "이체 내역과 설치 앱" },
  { key: "timeline", title: "타임라인", desc: "시간순으로 사실을 쌓기" },
  { key: "details", title: "신고·증거", desc: "신고 여부·캡처 여부(체크)" },
  { key: "export", title: "보내기", desc: "복사/인쇄용 요약" },
];

function ChipInputList({
  label,
  helper,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  helper?: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {helper ? <div className="text-[12px] text-muted-foreground">{helper}</div> : null}
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
        />
        <Button
          type="button"
          variant="outline"
          className="shrink-0 rounded-xl"
          onClick={() => {
            const v = draft.trim();
            if (!v) return;
            onChange([...values, v]);
            setDraft("");
          }}
        >
          추가
        </Button>
      </div>
      {values.length ? (
        <ul className="space-y-2">
          {values.map((v) => (
            <li
              key={v}
              className="flex items-center justify-between gap-2 rounded-2xl border border-border bg-surface px-3 py-2 text-[13px]"
            >
              <span className="break-all">{v}</span>
              <Button type="button" variant="ghost" className="rounded-xl" onClick={() => onChange(values.filter((x) => x !== v))}>
                삭제
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-[13px] text-muted-foreground">아직 없습니다.</div>
      )}
    </div>
  );
}

export function EvidenceOrganizerClient() {
  const { draft, setDraft, reset } = useEvidenceDraft();
  const [step, setStep] = useState(0);
  const [bt, setBt] = useState({
    bankName: "",
    amount: "",
    accountNumberMasked: "",
    recipientName: "",
    timestamp: "",
    notes: "",
  });

  useEffect(() => {
    trackEvent("evidence.start");
  }, []);

  const summaries = useMemo(() => {
    return {
      concise: buildConciseSummary(draft),
      chronological: buildChronologicalSummary(draft),
      timeline: buildTimelineText(draft),
      police: buildReportSummary(draft),
      bank: buildBankSummary(draft),
      lawyer: buildLawyerSummary(draft),
      family: buildFamilySummary(draft),
    };
  }, [draft]);

  const s = STEPS[step]!;

  async function copyText(text: string, format: "copy" | "timeline_copy" = "copy") {
    try {
      await navigator.clipboard.writeText(text);
      trackEvent("evidence.export", { format: format === "timeline_copy" ? "timeline_copy" : "copy" });
    } catch {
      // ignore
    }
  }

  function printText(title: string, text: string) {
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    w.document.write(`<!doctype html><html lang="ko"><head><meta charset="utf-8"/><title>${title}</title>
      <style>
        body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Apple SD Gothic Neo,Noto Sans KR,Malgun Gothic,Arial,sans-serif;padding:24px;line-height:1.6;color:#111}
        h1{font-size:18px;margin:0 0 12px}
        pre{white-space:pre-wrap;word-break:break-word;font-size:12px}
      </style></head><body>
      <h1>${title}</h1>
      <pre>${text.replace(/</g, "&lt;")}</pre>
      </body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
    trackEvent("evidence.export", { format: "print" });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5 lg:items-start">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>단계</CardTitle>
          <CardDescription>작성 중에도 자동 저장됩니다(내 기기 로컬).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {STEPS.map((x, idx) => (
            <button
              key={x.key}
              type="button"
              className={[
                "w-full rounded-2xl border px-4 py-3 text-left",
                idx === step ? "border-brand bg-muted" : "border-border bg-background hover:bg-muted/60",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
              ].join(" ")}
              onClick={() => setStep(idx)}
            >
              <div className="text-[13px] font-semibold">{idx + 1}. {x.title}</div>
              <div className="text-[12px] text-muted-foreground">{x.desc}</div>
            </button>
          ))}

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => {
                reset();
                setDraft(emptyDraft());
                trackEvent("evidence.clear");
              }}
            >
              초기화(로컬 삭제)
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4 text-[12px] leading-5 text-muted-foreground">
            개인정보는 <b className="text-foreground">최소한만</b> 입력하세요. 이 기능은 서버로 업로드하지 않습니다.
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>{s.title}</CardTitle>
          <CardDescription>{s.desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {s.key === "basics" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">사건 제목</Label>
                <Input
                  id="title"
                  value={draft.incidentTitle}
                  onChange={(e) => setDraft((prev) => ({ ...prev, incidentTitle: e.target.value }))}
                  placeholder="예: 4/2 오후, ‘검찰’ 사칭 전화 + 앱 설치 유도"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occurred">사건 발생(추정) 시각</Label>
                <Input
                  id="occurred"
                  value={draft.incidentOccurredAt}
                  onChange={(e) => setDraft((prev) => ({ ...prev, incidentOccurredAt: e.target.value }))}
                  placeholder="예: 2026-04-02 14:30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="claimed">발신자가 주장한 기관·단체</Label>
                <Input
                  id="claimed"
                  value={draft.claimedOrganization}
                  onChange={(e) => setDraft((prev) => ({ ...prev, claimedOrganization: e.target.value }))}
                  placeholder="예: OO은행, 검찰 OO, 택배사명"
                />
              </div>

              <div className="space-y-2">
                <Label>피해자 유형</Label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {(
                    [
                      ["self", "본인"],
                      ["parent", "부모님"],
                      ["other", "기타"],
                    ] as const
                  ).map(([k, label]) => {
                    const selected = draft.victimType === k;
                    return (
                      <button
                        key={k}
                        type="button"
                        className={[
                          "rounded-2xl border px-3 py-3 text-[14px] font-semibold",
                          selected ? "border-brand bg-muted" : "border-border bg-background hover:bg-muted/60",
                          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
                        ].join(" ")}
                        onClick={() => setDraft((prev) => ({ ...prev, victimType: k }))}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : s.key === "contacts" ? (
            <div className="space-y-6">
              <ChipInputList
                label="전화/발신번호"
                helper="여러 번호가 있으면 하나씩 추가하세요."
                values={draft.contactPhoneNumbers}
                onChange={(next) => setDraft((prev) => ({ ...prev, contactPhoneNumbers: next }))}
                placeholder="예: 02-xxxx-xxxx / 010-xxxx-xxxx"
              />
              <ChipInputList
                label="의심 링크(URL)"
                values={draft.suspiciousLinks}
                onChange={(next) => setDraft((prev) => ({ ...prev, suspiciousLinks: next }))}
                placeholder="https://..."
              />
            </div>
          ) : s.key === "content" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="msgs">문자/메신저 내용(가능하면 원문)</Label>
                <Textarea
                  id="msgs"
                  value={draft.suspiciousMessages.join("\n---\n")}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      suspiciousMessages: e.target.value
                        .split(/\n---\n/g)
                        .map((x) => x.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder={"문자를 여러 개면 아래 구분선으로 나눠 적어도 됩니다.\n---\n"}
                />
                <div className="text-[12px] text-muted-foreground">
                  민감정보는 가능하면 가리고(계좌 전체/주민번호), 패턴 위주로 남겨도 도움이 됩니다.
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">추가 메모</Label>
                <Textarea
                  id="notes"
                  value={draft.notes}
                  onChange={(e) => setDraft((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="상대가 한 말, 느낀 점, 이미 한 조치 등"
                />
              </div>
            </div>
          ) : s.key === "money" ? (
            <div className="space-y-6">
              <ChipInputList
                label="설치 앱 목록"
                helper="원격/보안/인증을 사칭한 앱이면 특히 위험합니다."
                values={draft.installedApps}
                onChange={(next) => setDraft((prev) => ({ ...prev, installedApps: next }))}
                placeholder="예: (의심) 원격지원 앱 이름"
              />

              <div className="space-y-3 rounded-2xl border border-border p-4">
                <div className="text-[13px] font-semibold">송금/이체 1건 추가</div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bname">은행</Label>
                    <Input
                      id="bname"
                      placeholder="은행명"
                      value={bt.bankName}
                      onChange={(e) => setBt({ ...bt, bankName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amt">금액</Label>
                    <Input
                      id="amt"
                      placeholder="예: 3,000,000원"
                      value={bt.amount}
                      onChange={(e) => setBt({ ...bt, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acct">계좌(일부만)</Label>
                    <Input
                      id="acct"
                      placeholder="끝 4자리 등"
                      value={bt.accountNumberMasked}
                      onChange={(e) => setBt({ ...bt, accountNumberMasked: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recv">수취인(알면)</Label>
                    <Input
                      id="recv"
                      placeholder="수취인 표기"
                      value={bt.recipientName}
                      onChange={(e) => setBt({ ...bt, recipientName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="when">시각</Label>
                    <Input
                      id="when"
                      placeholder="예: 2026-04-02 15:10"
                      value={bt.timestamp}
                      onChange={(e) => setBt({ ...bt, timestamp: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bnotes">메모(선택)</Label>
                    <Input
                      id="bnotes"
                      placeholder="예: 상대가 ‘수수료’라고 주장"
                      value={bt.notes}
                      onChange={(e) => setBt({ ...bt, notes: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  className="w-full rounded-xl"
                  onClick={() => {
                    const bankName = bt.bankName.trim();
                    const amount = bt.amount.trim();
                    const accountNumberMasked = bt.accountNumberMasked.trim();
                    const recipientName = bt.recipientName.trim();
                    const timestamp = bt.timestamp.trim();
                    const notes = bt.notes.trim();
                    if (!bankName && !amount && !accountNumberMasked && !recipientName && !timestamp && !notes) return;
                    const id =
                      typeof crypto !== "undefined" && "randomUUID" in crypto
                        ? crypto.randomUUID()
                        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
                    setDraft((prev) => ({
                      ...prev,
                      bankTransfers: [
                        ...prev.bankTransfers,
                        { id, bankName, amount, accountNumberMasked, recipientName, timestamp, notes },
                      ],
                    }));
                    setBt({
                      bankName: "",
                      amount: "",
                      accountNumberMasked: "",
                      recipientName: "",
                      timestamp: "",
                      notes: "",
                    });
                  }}
                >
                  송금 기록 추가
                </Button>

                {draft.bankTransfers.length ? (
                  <ul className="space-y-2 text-[13px]">
                    {draft.bankTransfers.map((t) => (
                      <li key={t.id} className="flex items-start justify-between gap-2 rounded-2xl bg-muted p-3">
                        <div className="space-y-1 text-muted-foreground">
                          <div className="font-semibold text-foreground">
                            {t.amount ?? "금액미상"} · {t.bankName ?? "은행미상"}
                          </div>
                          <div>
                            계좌(일부): {t.accountNumberMasked ?? "-"} / 수취인: {t.recipientName ?? "-"}
                          </div>
                          <div>시각: {t.timestamp ?? "-"}</div>
                          {t.notes ? <div>메모: {t.notes}</div> : null}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          className="rounded-xl"
                          onClick={() =>
                            setDraft((prev) => ({
                              ...prev,
                              bankTransfers: prev.bankTransfers.filter((x) => x.id !== t.id),
                            }))
                          }
                        >
                          삭제
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ) : s.key === "timeline" ? (
            <TimelineEditor
              entries={draft.timelineEntries}
              onChange={(next) => setDraft((prev) => ({ ...prev, timelineEntries: next }))}
            />
          ) : s.key === "details" ? (
            <div className="space-y-4">
              <p className="text-[13px] text-muted-foreground">
                체크만으로도 나중에 요약에 반영됩니다. 법적 효력을 주장하지 않습니다.
              </p>
              {(
                [
                  ["policeReported", "경찰에 신고했거나 신고 예정"],
                  ["bankReported", "은행·카드사에 문의/신고했거나 예정"],
                  ["hasCallRecording", "통화 녹취·녹음이 있다(있으면 체크)"],
                  ["hasMessageCapture", "문자·메신저 캡처가 있다"],
                  ["hasScreenCapture", "화면 캡처·스크린샷이 있다"],
                ] as const
              ).map(([key, label]) => {
                const checked =
                  key === "policeReported"
                    ? draft.policeReported
                    : key === "bankReported"
                      ? draft.bankReported
                      : key === "hasCallRecording"
                        ? draft.hasCallRecording
                        : key === "hasMessageCapture"
                          ? draft.hasMessageCapture
                          : draft.hasScreenCapture;
                return (
                <label
                  key={key}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-[14px]"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border"
                    checked={checked}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        [key]: e.target.checked,
                      }))
                    }
                  />
                  <span>{label}</span>
                </label>
              );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-2 lg:grid-cols-2">
                <ExportBlock title="간단 요약" text={summaries.concise} onCopy={() => copyText(summaries.concise)} onPrint={() => printText("간단 요약", summaries.concise)} />
                <ExportBlock
                  title="시간순 요약"
                  text={summaries.chronological}
                  onCopy={() => copyText(summaries.chronological, "timeline_copy")}
                  onPrint={() => printText("시간순 요약", summaries.chronological)}
                />
                <ExportBlock title="타임라인" text={summaries.timeline} onCopy={() => copyText(summaries.timeline)} onPrint={() => printText("타임라인", summaries.timeline)} />
                <ExportBlock title="경찰 신고용 초안" text={summaries.police} onCopy={() => copyText(summaries.police)} onPrint={() => printText("경찰 신고용 초안", summaries.police)} />
                <ExportBlock title="은행 상담용 초안" text={summaries.bank} onCopy={() => copyText(summaries.bank)} onPrint={() => printText("은행 상담용 초안", summaries.bank)} />
                <ExportBlock title="변호사 상담용 초안" text={summaries.lawyer} onCopy={() => copyText(summaries.lawyer)} onPrint={() => printText("변호사 상담용 초안", summaries.lawyer)} />
                <ExportBlock title="가족 공유용" text={summaries.family} onCopy={() => copyText(summaries.family)} onPrint={() => printText("가족 공유용", summaries.family)} />
              </div>

              <div className="print-only hidden" />
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <Button type="button" variant="outline" className="rounded-xl" disabled={step === 0} onClick={() => setStep((x) => x - 1)}>
              이전
            </Button>
            <Button type="button" className="rounded-xl" disabled={step === STEPS.length - 1} onClick={() => setStep((x) => x + 1)}>
              다음
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExportBlock({
  title,
  text,
  onCopy,
  onPrint,
}: {
  title: string;
  text: string;
  onCopy: () => void;
  onPrint: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[14px] font-semibold">{title}</div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="rounded-xl" onClick={onCopy}>
            복사
          </Button>
          <Button type="button" variant="outline" className="rounded-xl" onClick={onPrint}>
            인쇄
          </Button>
        </div>
      </div>
      <pre className="mt-3 max-h-[220px] overflow-auto whitespace-pre-wrap break-words text-[12px] leading-5 text-muted-foreground">
        {text}
      </pre>
    </div>
  );
}

function TimelineEditor({
  entries,
  onChange,
}: {
  entries: TimelineEntry[];
  onChange: (next: TimelineEntry[]) => void;
}) {
  const [local, setLocal] = useState<TimelineEntry>({
    id: "",
    timestamp: "",
    type: "call",
    actor: "",
    description: "",
    evidenceAttached: false,
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ts">시각</Label>
          <Input id="ts" value={local.timestamp} onChange={(e) => setLocal({ ...local, timestamp: e.target.value })} placeholder="예: 2026-04-02 14:05" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">유형</Label>
          <select
            id="type"
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[15px] shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            value={local.type}
            onChange={(e) => setLocal({ ...local, type: e.target.value as TimelineEntry["type"] })}
          >
            <option value="call">전화</option>
            <option value="sms">문자</option>
            <option value="app">앱/설치</option>
            <option value="transfer">송금/이체</option>
            <option value="other">기타</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="actor">상대(기관명/익명/번호 등)</Label>
          <Input id="actor" value={local.actor} onChange={(e) => setLocal({ ...local, actor: e.target.value })} placeholder="예: ‘검찰 OO’ / 010-xxxx-xxxx" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="desc">무슨 일이 있었나요</Label>
          <Textarea id="desc" value={local.description} onChange={(e) => setLocal({ ...local, description: e.target.value })} placeholder="한 줄이라도 좋습니다. 나중에 보강할 수 있어요." />
        </div>
        <label className="flex items-center gap-2 text-[14px] text-muted-foreground md:col-span-2">
          <input
            type="checkbox"
            checked={local.evidenceAttached}
            onChange={(e) => setLocal({ ...local, evidenceAttached: e.target.checked })}
          />
          캡처/녹취/원문 등 증거가 있다(체크만)
        </label>
      </div>

      <Button
        type="button"
        className="w-full rounded-xl"
        onClick={() => {
          if (!local.timestamp.trim() || !local.description.trim()) return;
          const id =
            typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
          onChange([...entries, { ...local, id }]);
          setLocal({
            id: "",
            timestamp: "",
            type: "call",
            actor: "",
            description: "",
            evidenceAttached: false,
          });
        }}
      >
        타임라인에 추가
      </Button>

      {entries.length ? (
        <ul className="space-y-2">
          {[...entries]
            .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
            .map((e) => (
              <li key={e.id} className="rounded-2xl border border-border bg-surface p-3 text-[13px] leading-6 text-muted-foreground">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-foreground">
                      [{e.timestamp}] ({e.type}) {e.actor ? `- ${e.actor}` : ""}
                    </div>
                    <div className="mt-1">{e.description}</div>
                    <div className="mt-1 text-[12px]">증거: {e.evidenceAttached ? "있음(표시만)" : "미체크"}</div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl"
                    onClick={() => onChange(entries.filter((x) => x.id !== e.id))}
                  >
                    삭제
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="text-[13px] text-muted-foreground">타임라인이 비어있습니다.</div>
      )}
    </div>
  );
}
