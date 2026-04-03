import type { SelfCheckQuestion } from "@/schemas/domain";

export const selfCheckQuestions: SelfCheckQuestion[] = [
  {
    id: "authority",
    prompt: "상대가 경찰·검찰·금감원·은행·카드사·택배 등 ‘공적 기관/회사’를 사칭했나요?",
    helpText: "이름을 대더라도 확인이 필요합니다.",
    options: [
      { id: "no", label: "아니요", score: 0, flags: [] },
      { id: "yes", label: "예", score: 18, flags: ["authority_impersonation"] },
      { id: "unsure", label: "잘 모르겠어요", score: 6, flags: ["unclear_authority"] },
    ],
  },
  {
    id: "urgency",
    prompt: "‘지금 당장’ ‘10분 안에’처럼 시간 압박이 강했나요?",
    options: [
      { id: "no", label: "아니요", score: 0, flags: [] },
      { id: "yes", label: "예", score: 12, flags: ["urgency"] },
    ],
  },
  {
    id: "secrecy",
    prompt: "가족/은행/지인에게 말하지 말라고 했나요?",
    options: [
      { id: "no", label: "아니요", score: 0, flags: [] },
      { id: "yes", label: "예", score: 14, flags: ["secrecy_isolation"] },
    ],
  },
  {
    id: "app_install",
    prompt: "앱 설치, 원격제어, 화면 공유를 요구했나요?",
    options: [
      { id: "no", label: "아니요", score: 0, flags: [] },
      { id: "asked", label: "요구만 했어요", score: 16, flags: ["app_or_remote_asked"] },
      { id: "done", label: "이미 설치/허용했어요", score: 28, flags: ["app_or_remote_done"] },
    ],
  },
  {
    id: "link",
    prompt: "문자/메신저 링크를 눌렀거나, 로그인/결제 화면으로 유도했나요?",
    options: [
      { id: "no", label: "아니요", score: 0, flags: [] },
      { id: "clicked", label: "링크는 눌렀어요", score: 12, flags: ["link_clicked"] },
      { id: "entered", label: "정보 입력까지 했어요", score: 20, flags: ["credential_entry"] },
    ],
  },
  {
    id: "sensitive",
    prompt: "계좌/카드/OTP/비밀번호/신분증 사진 같은 민감정보를 요구했나요?",
    options: [
      { id: "no", label: "아니요", score: 0, flags: [] },
      { id: "asked", label: "요구만 했어요", score: 12, flags: ["sensitive_asked"] },
      { id: "shared", label: "일부 알려줬어요", score: 22, flags: ["sensitive_shared"] },
    ],
  },
  {
    id: "money",
    prompt: "송금/이체/현금 전달/상품권/가상자산 이전을 요구했나요?",
    options: [
      { id: "no", label: "아니요", score: 0, flags: [] },
      { id: "asked", label: "요구만 했어요", score: 14, flags: ["money_requested"] },
      { id: "sent", label: "이미 보냈어요", score: 26, flags: ["money_sent"] },
    ],
  },
  {
    id: "on_call",
    prompt: "지금도 통화가 이어지고 있나요?",
    options: [
      { id: "no", label: "아니요", score: 0, flags: [] },
      { id: "yes", label: "예(통화 중)", score: 10, flags: ["active_call"] },
    ],
  },
];
