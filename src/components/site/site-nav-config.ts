export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

/** 데스크톱: 짧은 대분류 라벨 + 호버 시 세부 항목 */
export const navGroups: NavGroup[] = [
  {
    id: "now",
    label: "지금 대응",
    items: [
      { href: "/emergency", label: "긴급 대응", description: "상황별 즉시 조치" },
      { href: "/check", label: "1분 자가진단", description: "위험 신호 빠르게" },
      { href: "/guide", label: "상황별 가이드", description: "검색 맞춤 요약" },
      { href: "/evidence", label: "증거 정리", description: "타임라인·복사" },
    ],
  },
  {
    id: "learn",
    label: "알아보기",
    items: [
      { href: "/scams", label: "유형 라이브러리", description: "사기 패턴·대화 예시" },
      { href: "/recovery", label: "피해 회복", description: "시간대별 체크" },
      { href: "/alerts", label: "경보", description: "최근 유의 정보" },
      { href: "/learn", label: "학습", description: "원리·심리" },
    ],
  },
  {
    id: "support",
    label: "도움·연결",
    items: [
      { href: "/help", label: "공식 도움 허브", description: "준비물·판단 기준" },
      { href: "/help/contacts", label: "공식 연락처", description: "번호·링크" },
      { href: "/help/institutions", label: "전문 기관·법률 참고", description: "공공 출발점" },
      { href: "/identity", label: "명의·2차 피해", description: "개통·계좌 점검" },
      { href: "/legal", label: "법률 도움", description: "공공지원·체크리스트" },
      { href: "/family", label: "가족/어르신", description: "큰 글씨·대본" },
    ],
  },
  {
    id: "tools",
    label: "도구",
    items: [
      { href: "/tools/suspicious-text", label: "문자·카톡 의심 체크", description: "규칙 기반" },
      { href: "/tools/script-detector", label: "스크립트 탐지", description: "동일 도구(별명)" },
      { href: "/search", label: "검색", description: "내부 콘텐츠 찾기" },
    ],
  },
];
