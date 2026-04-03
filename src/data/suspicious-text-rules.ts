import { SuspiciousTextRuleSchema, type SuspiciousTextRule } from "@/schemas/domain";

const raw: unknown[] = [
  {
    id: "urgency",
    label: "긴급·즉시 압박",
    patternSources: ["지금\\s*당장", "10분\\s*안에", "즉시", "마감", "오늘\\s*안에"],
    advice: "시간을 주지 않으려는 말일수록 잠시 멈추고, 공식 앱·공식 번호로 확인하세요.",
    why: "판단할 틈을 주지 않으려는 전형적 패턴입니다.",
  },
  {
    id: "secrecy",
    label: "비밀·고립 유도",
    patternSources: ["가족(?:에게)?\\s*말하지\\s*마", "비밀로", "아무에게도", "경찰에\\s*말하지"],
    advice: "주변에 알리지 말라는 요구는 조종 신호일 수 있습니다. 믿을 만한 사람·공식 창구에 확인하세요.",
    why: "피해를 숨기게 만들어 대응을 늦추려는 수법이 흔합니다.",
  },
  {
    id: "authority",
    label: "기관·수사 사칭 표현",
    patternSources: ["검찰", "경찰", "금감원", "금융감독원", "수사", "계좌\\s*동결", "체포", "영장"],
    advice: "권위를 내세워도 통화로 송금·앱 설치·민감정보 요구는 매우 위험합니다.",
    why: "공공기관 명칭을 섞어 신뢰를 얻으려 합니다.",
  },
  {
    id: "app_remote",
    label: "앱 설치·원격·화면공유",
    patternSources: ["앱\\s*설치", "원격", "화면\\s*공유", "팀뷰어", "AnyDesk", "애니데스크", "원격지원"],
    advice: "원격제어는 기기를 넘기는 것과 같습니다. 즉시 중단하고 권한을 해제하세요.",
    why: "악성앱·원격이 결합되면 피해가 빨리 커질 수 있습니다.",
  },
  {
    id: "link",
    label: "링크·로그인 유도",
    patternSources: ["http", "bit\\.ly", "tinyurl", "me2\\.kr", "로그인", "본인\\s*인증", "접속"],
    advice: "문자·메신저 링크로 로그인하지 마세요. 공식 앱·직접 입력한 주소만 사용하세요.",
    why: "피싱 페이지로 유도하는 대표 경로입니다.",
  },
  {
    id: "money",
    label: "송금·안전계좌·수수료·현금",
    patternSources: ["송금", "이체", "안전\\s*계좌", "수수료", "보증금", "환불", "현금", "ATM"],
    advice: "‘안전계좌’·추가 송금·수수료 명목 이체는 강한 위험 신호입니다.",
    why: "최종 목적이 금전 취득인 경우가 많습니다.",
  },
  {
    id: "loan_switch",
    label: "대출 전환·승인·한도",
    patternSources: ["대출", "갈아타기", "금리", "한도", "승인", "기존\\s*대출"],
    advice: "대출 조건을 문자·카톡만으로 확정하지 마세요. 금융기관 공식 창구에서 확인하세요.",
    why: "저금리·승인 압박으로 주의를 흐리게 합니다.",
  },
  {
    id: "family_impersonation",
    label: "가족·지인 긴급 사칭",
    patternSources: ["엄마", "아빠", "할머니", "아들", "딸", "나\\s*야", "지금\\s*바쁘", "사고", "병원"],
    advice: "가족 목소리·문장이라도, 연락처·계좌 확인 없이 송금하지 마세요. 다른 채널로 확인하세요.",
    why: "감정을 자극해 신속한 이체를 유도합니다.",
  },
  {
    id: "otp",
    label: "OTP·비밀번호·카드",
    patternSources: ["OTP", "인증번호", "비밀번호", "보안카드", "CVC", "CVV"],
    advice: "민감정보는 전화·문자로 요구받는 경우가 거의 없습니다.",
    why: "정보 탈취가 목적일 수 있습니다.",
  },
  {
    id: "refund_support",
    label: "환급·지원금·세금",
    patternSources: ["환급", "지원금", "정부", "코로나", "과세", "세금\\s*환급", "예금\\s*보험"],
    advice: "‘클릭 한 번’으로 지급되는 공적 지원은 드뭅니다. 공공기관 공식 사이트를 직접 확인하세요.",
    why: "혜택을 미끼로 링크·개인정보 입력을 유도합니다.",
  },
];

export const suspiciousTextRules: SuspiciousTextRule[] = raw.map((r) =>
  SuspiciousTextRuleSchema.parse(r),
);

export function compileSuspiciousRules(rules: SuspiciousTextRule[]) {
  return rules.map((rule) => ({
    ...rule,
    patterns: rule.patternSources.map((src) => new RegExp(src, "gi")),
  }));
}
