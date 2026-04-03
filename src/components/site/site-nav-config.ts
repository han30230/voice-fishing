export type NavItem = {
  href: string;
  label: string;
  /** 보조 설명 — 메뉴 미리보기용 한 줄 */
  description?: string;
};

export type NavGroup = {
  id: string;
  /** 상단 탭에 보이는 짧은 이름 */
  label: string;
  /** 드롭다운·모바일 섹션 상단 요약(한 문장) */
  hint: string;
  items: NavItem[];
};

/**
 * 전역 메뉴 — 라벨 길이·설명 톤을 맞춰 제품 사이트 내비게이션과 유사하게 유지합니다.
 */
export const navGroups: NavGroup[] = [
  {
    id: "now",
    label: "지금 대응",
    hint: "막혔을 때 순서대로 확인할 수 있는 바로 실행 메뉴입니다.",
    items: [
      {
        href: "/emergency",
        label: "긴급 대응 센터",
        description: "상황별 5분 행동·금지 사항·연락 순서",
      },
      {
        href: "/check",
        label: "빠른 자가진단",
        description: "짧은 질문으로 위험 신호를 정리합니다",
      },
      {
        href: "/guide",
        label: "상황별 가이드",
        description: "키워드·상황에 맞춘 요약 페이지",
      },
      {
        href: "/evidence",
        label: "증거·타임라인 정리",
        description: "기기에만 저장하고 복사·인쇄",
      },
    ],
  },
  {
    id: "learn",
    label: "알아보기",
    hint: "수법을 이해하고, 회복과 배경지식을 차례로 살펴봅니다.",
    items: [
      {
        href: "/scams",
        label: "사기 유형 라이브러리",
        description: "대표 수법·멘트·대화 예시",
      },
      {
        href: "/recovery",
        label: "피해 회복 가이드",
        description: "시간대별 체크리스트",
      },
      {
        href: "/alerts",
        label: "보안 경보",
        description: "최근 유의할 만한 소식",
      },
      {
        href: "/learn",
        label: "보이스피싱 이해하기",
        description: "심리·통화 패턴·원리",
      },
    ],
  },
  {
    id: "support",
    label: "도움·연결",
    hint: "공식 창구 연결과 법률·가족 지원 정보입니다.",
    items: [
      {
        href: "/help",
        label: "도움말 허브",
        description: "신고 전 준비물과 전체 흐름",
      },
      {
        href: "/help/contacts",
        label: "공식 연락처",
        description: "기관별 번호·공식 링크",
      },
      {
        href: "/help/institutions",
        label: "기관·법률 참고 안내",
        description: "공공 정보 출발점·선택 기준",
      },
      {
        href: "/help/law-firms",
        label: "법률 지원 정보",
        description: "검증·출처 기반 디렉터리",
      },
      {
        href: "/identity",
        label: "명의·2차 피해",
        description: "개통·계좌 등 점검 순서",
      },
      {
        href: "/legal",
        label: "법률 절차 안내",
        description: "공익 지원·진술·제출 자료",
      },
      {
        href: "/family",
        label: "가족·어르신 모드",
        description: "큰 글씨·낭독에 맞춘 화면",
      },
    ],
  },
  {
    id: "tools",
    label: "도구",
    hint: "문자 점검과 사이트 안 검색을 한곳에 모았습니다.",
    items: [
      {
        href: "/tools/suspicious-text",
        label: "문자·메시지 의심도 점검",
        description: "패턴·규칙 기반 참고 분석",
      },
      {
        href: "/tools/script-detector",
        label: "위험 표현·스크립트 분석",
        description: "통화·문자 대본 붙여넣기",
      },
      {
        href: "/search",
        label: "통합 검색",
        description: "유형·가이드·도움말 통합 찾기",
      },
    ],
  },
];
