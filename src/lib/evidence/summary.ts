import type { EvidenceDraft } from "@/schemas/domain";

function lines(xs: string[]) {
  return xs.filter(Boolean).join("\n");
}

export function buildConciseSummary(d: EvidenceDraft) {
  const title = d.incidentTitle?.trim() || "(사건 제목 미입력)";
  return lines([
    `[요약] ${title}`,
    d.contactPhoneNumbers.length ? `- 연락/발신 번호: ${d.contactPhoneNumbers.join(", ")}` : "",
    d.suspiciousLinks.length ? `- 의심 링크: ${d.suspiciousLinks.join(" | ")}` : "",
    d.bankTransfers.length ? `- 송금/이체 기록: ${d.bankTransfers.length}건` : "",
    d.installedApps.length ? `- 설치 앱: ${d.installedApps.join(", ")}` : "",
    d.timelineEntries.length ? `- 타임라인: ${d.timelineEntries.length}건` : "",
    d.notes.trim() ? `- 메모: ${d.notes.trim()}` : "",
  ]);
}

export function buildTimelineText(d: EvidenceDraft) {
  const sorted = [...d.timelineEntries].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  const body = sorted
    .map((e) => `- [${e.timestamp}] (${e.type}) ${e.actor ? `${e.actor} / ` : ""}${e.description}`)
    .join("\n");
  return lines([`[타임라인] ${d.incidentTitle || ""}`.trim(), body]);
}

export function buildReportSummary(d: EvidenceDraft) {
  return lines([
    `[경찰 신고용 초안]`,
    `사건명: ${d.incidentTitle || "(미입력)"}`,
    `피해자 유형: ${d.victimType}`,
    "",
    `1) 경위(간단)`,
    buildConciseSummary(d),
    "",
    `2) 타임라인`,
    buildTimelineText(d),
    "",
    `3) 증거 목록`,
    `- 문자/메시지: ${d.suspiciousMessages.length}건`,
    `- 링크: ${d.suspiciousLinks.length}건`,
    `- 통화번호 기록: ${d.contactPhoneNumbers.length}건`,
  ]);
}

export function buildBankSummary(d: EvidenceDraft) {
  const transfers = d.bankTransfers
    .map(
      (t, i) =>
        `${i + 1}) ${t.timestamp ?? "시각미상"} / ${t.bankName ?? "은행미상"} / ${t.amount ?? "금액미상"} / ${t.recipientName ?? "수취인미상"} / 계좌(일부): ${t.accountNumberMasked ?? "-"}`,
    )
    .join("\n");

  return lines([
    `[은행 상담용 초안]`,
    `사건 제목: ${d.incidentTitle || "(미입력)"}`,
    "",
    `의심 경로`,
    d.suspiciousLinks.length ? d.suspiciousLinks.map((x) => `- ${x}`).join("\n") : "- (없음)",
    "",
    `송금/이체 내역`,
    transfers || "- (없음)",
    "",
    `추가 메모`,
    d.notes.trim() || "- (없음)",
  ]);
}

export function buildLawyerSummary(d: EvidenceDraft) {
  return lines([
    `[변호사 상담용 사실관계 정리]`,
    `사건: ${d.incidentTitle || "(미입력)"}`,
    `피해자: ${d.victimType}`,
    "",
    `핵심 사실(한 문단)`,
    buildConciseSummary(d),
    "",
    `시간순 사실`,
    buildTimelineText(d),
    "",
    `증거 보유 현황`,
    `- 메시지 원문: ${d.suspiciousMessages.length}건`,
    `- 캡처/파일: 사용자 기기에 보관(본 서비스는 업로드하지 않음)`,
  ]);
}

export function buildFamilySummary(d: EvidenceDraft) {
  return lines([
    `[가족 공유용]`,
    "지금 상황 요약입니다. 비난보다 ‘멈춤·확인·도움’이 필요합니다.",
    "",
    buildConciseSummary(d),
    "",
    "가족이 같이 하면 좋은 것:",
    "- 공식 앱/공식 번호로 확인",
    "- 추가 송금/설치 중단",
    "- 통화기록·문자 캡처",
  ]);
}
