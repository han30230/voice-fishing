/**
 * 보이스피싱·스미싱 관련 ‘참고할 만한’ 공공·준공공 채널.
 * 특정 민간 로펌 추천·평점은 넣지 않습니다. 운영 시 공식 정보로 갱신하세요.
 */
export type PublicReferenceEntry = {
  id: string;
  name: string;
  role: string;
  /** 직접 전화가 어렵거나 미검증이면 비움 */
  phone?: string;
  link: string;
  linkLabel: string;
  note: string;
  verifiedAt: string;
};

export const publicInstitutions: PublicReferenceEntry[] = [
  {
    id: "kisa",
    name: "한국인터넷진흥원(KISA)",
    role: "스미싱·명의도용 등 사이버 침해 상담·신고 안내(공개 채널)",
    phone: "118",
    link: "https://www.kisa.or.kr",
    linkLabel: "공식 사이트",
    note: "업무·절차는 기관 공지가 우선입니다. 문자로 온 링크는 누르지 마세요.",
    verifiedAt: "2026-04-03",
  },
  {
    id: "police",
    name: "경찰(긴급)",
    role: "긴급 범죄·신체 위험 등 112",
    phone: "112",
    link: "https://www.police.go.kr",
    linkLabel: "경찰청 공식 사이트",
    note: "보이스피싱 피해 신고는 관할 안내에 따릅니다.",
    verifiedAt: "2026-04-03",
  },
  {
    id: "fss",
    name: "금융감독원",
    role: "금융소비자 상담·분쟁조정 등(공개 콜센터 번호는 기관 공지 확인)",
    phone: "1332",
    link: "https://www.fss.or.kr",
    linkLabel: "공식 사이트",
    note: "지급정지·환급 여부는 개별 심사·절차에 따릅니다. 이 사이트는 결과를 보장하지 않습니다.",
    verifiedAt: "2026-04-03",
  },
  {
    id: "klac",
    name: "대한법률구조공단",
    role: "공익법률지원 등(자격·절차는 공단 안내)",
    link: "https://www.klac.or.kr",
    linkLabel: "공식 사이트",
    note: "승인 여부는 심사에 따릅니다. [TODO: 운영자 검증 후 대표번호·지역센터 안내 보강]",
    verifiedAt: "2026-04-03",
  },
];

/** 법률사무소 ‘추천’ 대신 선택 시 점검 항목 — 중립 안내 */
export const lawFirmSelectionChecklist: string[] = [
  "대한변호사협회 등에서 변호사 면허·소속 사무실을 확인합니다.",
  "수임료·성공보수 구조를 서면으로 확인하고, 급하게 송금하지 않습니다.",
  "‘경찰과 연결된다’ ‘환급 보장’ 식의 과장은 의심합니다.",
  "여러 곳의 상담 절차를 비교하되, 개인정보는 최소만 제공합니다.",
];

export const disclaimerInstitutionPage = {
  title: "이 페이지에 대해",
  body: [
    "이 사이트는 특정 법무법인·민간 업체를 추천하거나 순위·별점을 매기지 않습니다.",
    "‘어디가 좋다’는 식의 평가는 광고·이해관계에 흔들릴 수 있어, 공식 절차와 본인 판단을 우선합니다.",
    "연락처·업무는 기관 정책에 따라 바뀔 수 있으니 항상 공식 사이트에서 재확인하세요.",
  ],
};
