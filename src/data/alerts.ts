import type { AlertPost } from "@/schemas/domain";

export const alerts: AlertPost[] = [
  {
    slug: "trend-remote-app-2026q2",
    title: "최근 증가: ‘보안점검/원격지원’ 명목 앱 설치 유도",
    summary:
      "기관·은행을 사칭해 원격제어 앱 설치를 요구하는 사례가 반복됩니다. 설치 자체가 고위험 신호입니다.",
    tags: ["원격제어", "앱설치", "기관사칭"],
    publishedAt: "2026-04-02",
    seoTitle: "원격제어 앱 설치 유도 증가 주의보 | VoiceGuard",
    seoDescription: "최근 많이 신고되는 원격제어 앱 유도 패턴과 즉시 대응.",
  },
  {
    slug: "season-tax-support-sms",
    title: "시즌 주의: ‘지원금/환급’ 문자의 짧은 링크",
    summary:
      "정부 지원 시즌에 짧은 URL로 신청을 유도하는 스미싱이 많아집니다. 공식 포털에서만 확인하세요.",
    tags: ["스미싱", "시즌형", "정부사칭"],
    publishedAt: "2026-04-01",
    seoTitle: "지원금·환급 시즌 스미싱 주의 | VoiceGuard",
    seoDescription: "지원금/환급 문자가 왔을 때 안전한 확인 방법.",
  },
];

export const alertBySlug = new Map(alerts.map((a) => [a.slug, a]));
