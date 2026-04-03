import { IdentityProtectionItemSchema, type IdentityProtectionItem } from "@/schemas/domain";

const raw: unknown[] = [
  {
    id: "phone-subscription",
    title: "내 명의 휴대폰 개통 여부 확인",
    whyNow: "명의가 도용되면 모르는 요금·대포폰이 생길 수 있어, 빨리 확인할수록 대응 여지가 큽니다.",
    whatYouNeed: "본인 인증 가능한 정보(통신사 앱·고객센터 절차에 따름).",
    whereToGo: "가입 통신사 공식 앱·고객센터 또는 인터넷진흥원 등 공개된 명의도용 신고·상담 안내.",
    outboundUrl: "https://www.kisa.or.kr",
    outboundLabel: "한국인터넷진흥원 공식 사이트(명의도용·스미싱 등 안내 검색)",
    verifiedAt: "2026-04-03",
    caution: "문자로 온 링크·‘고객센터’ 번호는 믿지 마세요. 직접 입력한 주소만 사용하세요.",
  },
  {
    id: "new-line-block",
    title: "신규 개통 제한·추가 피해 차단",
    whyNow: "명의 도용이 확인되면 같은 명의로 추가 개통이 이어질 수 있습니다.",
    whatYouNeed: "통신사·관할 절차에 따른 본인 확인, 필요 서류는 기관 안내를 따릅니다.",
    whereToGo: "가입 통신사 공식 채널 및 공개된 신고 절차.",
    outboundUrl: "https://www.kisa.or.kr",
    outboundLabel: "KISA 공식 사이트(관련 안내 검색)",
    verifiedAt: "2026-04-03",
  },
  {
    id: "privacy-leak",
    title: "개인정보 노출 사고예방 관련 안내",
    whyNow: "동일 정보로 다른 서비스까지 연쇄 피해가 날 수 있습니다.",
    whatYouNeed: "노출 가능성이 있는 계정 목록, 최근 변경한 비밀번호 범위.",
    whereToGo: "침해 사실이 의심되면 공개된 신고·상담 절차를 따르세요.",
    outboundUrl: "https://www.kisa.or.kr",
    outboundLabel: "KISA 공식 사이트에서 ‘개인정보’ ‘침해’ 관련 안내 검색",
    verifiedAt: "2026-04-03",
    caution: "관할·절차는 사안별로 다릅니다. 공식 도메인을 직접 확인하세요.",
  },
  {
    id: "account-loan",
    title: "계좌·대출 이상 여부 점검",
    whyNow: "명의로 대출이나 계좌가 열렸는지 늦게 알면 회복이 어려워질 수 있습니다.",
    whatYouNeed: "본인 명의 금융기관 앱·공식 창구 접근.",
    whereToGo: "거래 은행·카드사·신용정보 관련 공식 조회(본인이 가입한 기관 우선).",
    outboundUrl: "https://www.fss.or.kr",
    outboundLabel: "금융감독원 공식 사이트(소비자·상담 안내)",
    verifiedAt: "2026-04-03",
    caution: "이 사이트는 금융 조회를 대행하지 않습니다.",
  },
];

export const identityProtectionItems: IdentityProtectionItem[] = raw.map((x) =>
  IdentityProtectionItemSchema.parse(x),
);
