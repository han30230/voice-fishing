import { LawFirmEntrySchema, type LawFirmEntry } from "@/schemas/domain";

/** 모든 항목에 공통 안내: 상담 전 등록·면허 공식 조회 */
export const KOREAN_BAR_OFFICIAL_LOOKUP = {
  label: "대한변협 등록·면허 정보(공식 조회)",
  url: "https://www.koreanbar.or.kr/",
} as const;

/**
 * 법률 도움 디렉터리(운영자 입력)
 *
 * - 자동 추천·순위·평점을 생성하지 않습니다.
 * - 목록 순서는 `displayOrder`(편집 순서)이며, 공개 자료 확인 범위·노출 정도를 고려해 정한 것으로 우열이나 추천을 뜻하지 않습니다.
 * - 새 항목: 아래 `raw`에 객체를 추가한 뒤 `npm run build`로 스키마 검증을 통과하는지 확인하세요.
 */
const raw: unknown[] = [
  {
    id: "lawfirm-chung",
    displayOrder: 1,
    name: "법무법인 청",
    organizationType: "법무법인",
    region: "전국",
    verifiedAt: "2026-04-03",
    specialties: ["형사(보이스피싱)", "민사(사안별 확인 필요)"],
    summary:
      "보이스피싱 관련 공개 사례량이 많은 편이며, 수거책·전달책·전화상담원·중계기 운영·항소심 감형 등 다양한 유형의 사례가 공식 사이트에서 확인된다. 최근에도 관련 해설 콘텐츠가 지속적으로 게시된다.",
    highlights: [
      "보이스피싱 카테고리 형태의 사례 축적이 확인됨",
      "수거책 관련 성공사례 다수 공개",
      "경찰 조사 전 대응 후 무죄 사례 공개",
      "전달책 항소심 집행유예 사례 공개",
      "전화상담원·콜센터 관련 집행유예 사례 공개",
    ],
    sources: [
      {
        label: "보이스피싱 성공사례 목록",
        url: "https://www.lawfirmchung.com/success/success01.php?category=12&code=success_case&page=1",
      },
      {
        label: "수거책 관련 사례",
        url: "https://www.lawfirmchung.com/success/success01.php?idx=73&ptype=view",
      },
      {
        label: "경찰 조사 전 대응 후 무죄 사례",
        url: "https://www.lawfirmchung.com/success/success01.php?idx=342&ptype=view",
      },
      {
        label: "전달책 항소심 집행유예 사례",
        url: "https://www.lawfirmchung.com/success/success01.php?idx=59&ptype=view",
      },
      { label: "공식 사이트", url: "https://www.lawfirmchung.com/" },
    ],
    cautions: [
      "공개 사례는 참고자료이며 동일 결과를 보장하지 않음",
      "담당 변호사, 비용, 수임 범위는 별도 확인 필요",
    ],
    website: "https://www.lawfirmchung.com/",
    tags: ["보이스피싱", "형사", "사례"],
  },
  {
    id: "lawfirm-bh",
    displayOrder: 2,
    name: "법무법인 B&H",
    organizationType: "법무법인",
    region: "서울/수원",
    verifiedAt: "2026-04-03",
    specialties: ["형사(보이스피싱)", "민사(손해배상 등)"],
    summary:
      "공식 사이트에 보이스피싱 센터가 별도로 운영되며, 사건 초기 대응, 형사·민사 동시 대응, 전달책·인출책·통장대여자 유형 설명, 증거 확보 포인트 등이 공개되어 있다.",
    highlights: [
      "보이스피싱 센터 별도 운영",
      "형사처벌과 민사상 손해배상 동시 진행 설명",
      "전달책·인출책·통장대여자 유형 설명 확인",
      "서울 본사무소·서울 분사무소·수원 분사무소 안내 확인",
    ],
    sources: [{ label: "보이스피싱 센터", url: "https://bnhlaw.co.kr/center/voice" }],
    cautions: [
      "전용 센터 존재는 확인되지만 사건 적합성은 개별 상담 필요",
      "비용·계약 조건은 서면 확인 필요",
    ],
    website: "https://bnhlaw.co.kr/",
    tags: ["보이스피싱", "센터", "손해배상"],
  },
  {
    id: "lawfirm-yk",
    displayOrder: 3,
    name: "법무법인 YK",
    organizationType: "법무법인",
    region: "전국",
    verifiedAt: "2026-04-03",
    specialties: ["형사(보이스피싱)", "피해자 대응"],
    summary:
      "형사센터 내 보이스피싱 전용 페이지에서 개념, 처벌 수위, 피의자·피고인 및 피해자 대응 프로세스, 수사부터 재판·피해 배상 절차까지의 지원 내용을 확인할 수 있다.",
    highlights: [
      "보이스피싱 전용 업무분야 페이지 존재",
      "피의자·피고인 대응과 피해자 대응을 함께 설명",
      "수사 단계부터 재판·피해 배상 절차까지 안내",
    ],
    sources: [
      {
        label: "보이스피싱 업무분야",
        url: "https://www.yklawfirm-crime.co.kr/field/detective/voice-phishing",
      },
    ],
    cautions: [
      "업무분야 소개 페이지 기준 정리이며 개별 사건 결과와는 별개",
      "실제 담당자와 수임 범위 확인 필요",
    ],
    website: "https://www.yklawfirm-crime.co.kr/",
    tags: ["보이스피싱", "피해자", "형사"],
  },
  {
    id: "lawfirm-daeryun-yuhan",
    displayOrder: 4,
    name: "법무법인(유한) 대륜",
    organizationType: "법무법인(유한)",
    region: "전국",
    verifiedAt: "2026-04-03",
    specialties: ["형사(보이스피싱/전자금융거래)"],
    summary:
      "보이스피싱·전자금융거래 전용 페이지를 운영하며, 보이스피싱 개념, 처벌 수위, 범죄단체 관련 설명, FAQ, 전문변호사팀 안내 등 구조화된 정보를 제공한다.",
    highlights: [
      "보이스피싱·전자금융거래 전용 페이지 확인",
      "FAQ 형태의 설명 제공",
      "범죄단체 활동 관련 설명 포함",
    ],
    sources: [
      {
        label: "보이스피싱·전자금융거래",
        url: "https://www.daeryunlaw-detective.com/field/147",
      },
    ],
    cautions: ["업무분야 소개 중심 자료", "구체적 사건 적합성은 별도 확인 필요"],
    website: "https://www.daeryunlaw-detective.com/",
    tags: ["보이스피싱", "전자금융"],
  },
  {
    id: "lawfirm-yungang",
    displayOrder: 5,
    name: "법무법인 윤강",
    organizationType: "법무법인",
    region: "서울",
    verifiedAt: "2026-04-03",
    specialties: [
      "형사(보이스피싱)",
      "민사(손해배상·부당이득반환·강제집행)",
    ],
    summary:
      "보이스피싱 종합대응 센터를 운영한다고 공개하고 있으며, 지급정지, 중간책 피의자 대응, 피해자 권리 구제, 손해배상·부당이득 반환, 강제집행 등 형사와 민사를 함께 다루는 설명이 확인된다.",
    highlights: [
      "보이스피싱 종합대응 센터 운영 명시",
      "지급정지 대응과 피해자 권리 구제 설명",
      "손해배상·부당이득 반환·강제집행 설명",
      "서울 강남구 테헤란로 409, 전화 02-2055-1422 공개",
    ],
    sources: [
      {
        label: "보이스피싱 종합대응 센터",
        url: "https://www.yglaw.co.kr/page/voice_phishing.php?me_code=2050",
      },
    ],
    cautions: [
      "피해 회복 설명이 포함되지만 회수 결과 보장은 아님",
      "계약 조건과 비용 구조는 별도 확인 필요",
    ],
    phone: "02-2055-1422",
    website: "https://www.yglaw.co.kr/",
    tags: ["보이스피싱", "센터", "민사"],
  },
  {
    id: "lawfirm-beobseung",
    displayOrder: 6,
    name: "법무법인 법승",
    organizationType: "법무법인",
    region: "서울 외 지점 운영 여부는 공식 사이트 확인",
    verifiedAt: "2026-04-03",
    specialties: ["피해자 대응", "단순가담자 대응", "민사 손해배상"],
    summary:
      "보이스피싱 피해자 대응과 단순가담자 대응 관련 공개 자료가 확인되며, 지급정지 신청, 피해구제신청, 손해배상 청구, 무혐의 주장 사례 등이 소개되어 있다.",
    highlights: [
      "피해자 대응 글에서 지급정지 신청·피해구제신청·손해배상 청구 설명",
      "단순가담자 무혐의 주장 관련 자료 확인",
      "서울 사무소 대표번호 02-782-9980 공개",
    ],
    sources: [
      {
        label: "피해자 대응 안내",
        url: "https://www.lawwin.co.kr/gwangju/knowledgedetail?index=7374",
      },
      {
        label: "단순가담자 관련 자료",
        url: "https://www.lawwin.co.kr/seoul/knowledgedetail?index=5932",
      },
    ],
    cautions: ["게시글·지식센터 자료 기준 정리", "개별 사건 결과와는 구분 필요"],
    phone: "02-782-9980",
    website: "https://www.lawwin.co.kr/",
    tags: ["피해자", "단순가담", "손해배상"],
  },
  {
    id: "lawfirm-hs",
    displayOrder: 7,
    name: "법무법인 HS",
    organizationType: "법무법인",
    region: "공식 사이트 확인",
    verifiedAt: "2026-04-03",
    specialties: ["형사(보이스피싱범죄)"],
    summary:
      "홈페이지에서 보이스피싱범죄를 별도 업무영역으로 운영하고 있으며, 현금 수거책 관련 불송치 사례와 가상화폐 환전·전달 가담 사건 집행유예 사례 등이 공개되어 있다.",
    highlights: [
      "보이스피싱범죄 별도 업무영역 확인",
      "수거책 관련 불송치 사례 검색 확인",
      "가상화폐 환전·전달 가담 집행유예 사례 검색 확인",
    ],
    sources: [
      { label: "보이스피싱범죄 업무영역", url: "https://law-hs.co.kr/45" },
      {
        label: "수거책 관련 사례",
        url: "https://law-hs.co.kr/77/?bmode=view&idx=169578193",
      },
      {
        label: "가상화폐 환전·전달 사례",
        url: "https://law-hs.co.kr/77/?bmode=view&idx=169579111",
      },
    ],
    cautions: ["공개 사례는 참고용", "구체적 담당자 및 수임 범위 확인 필요"],
    website: "https://law-hs.co.kr/",
    tags: ["보이스피싱", "수거책", "가상화폐"],
  },
  {
    id: "lawfirm-daeon",
    displayOrder: 8,
    name: "법무법인 대온",
    organizationType: "법무법인",
    region: "서울",
    verifiedAt: "2026-04-03",
    specialties: ["형사(보이스피싱)", "초기 대응·예방 안내"],
    summary:
      "공식 페이지에서 보이스피싱 정의, 확인 방법, 신고 필요성, 연루 시 대응 방향 등을 안내하고 있으며, 대표변호사·주소·전화번호 등 기본 정보도 함께 공개되어 있다.",
    highlights: [
      "보이스피싱 전용 설명 페이지 확인",
      "확인 습관과 신고 필요성 설명",
      "대표변호사 신동우, 서울 서초구 서초대로 250, 02-2138-3478 공개",
    ],
    sources: [
      {
        label: "보이스피싱 안내",
        url: "https://daeonlaw.co.kr/page/phishing.php?me_code=1040",
      },
    ],
    cautions: [
      "예방·안내 성격이 포함된 자료",
      "실제 사건 대응 범위는 상담으로 확인 필요",
    ],
    phone: "02-2138-3478",
    website: "https://daeonlaw.co.kr/",
    tags: ["보이스피싱", "안내", "서울"],
  },
  {
    id: "lawfirm-naran",
    displayOrder: 9,
    name: "법무법인 나란",
    organizationType: "법무법인",
    region: "공식 사이트 확인",
    verifiedAt: "2026-04-03",
    specialties: ["민사(보이스피싱 피해자 손해배상)"],
    summary:
      "보이스피싱 피해자 측 손해배상 사건에서 원고승소 사례가 공개되어 있으며, 사건 내용·진행 사항·결과가 구분되어 있어 피해 회복 관련 참고 자료로 활용하기 좋다.",
    highlights: [
      "보이스피싱 피해 사건 민사 승소 사례 공개",
      "사건 내용·진행 사항·결과 구조 확인",
      "분류는 민사, 결과는 원고승소로 표기",
    ],
    sources: [
      {
        label: "민사 승소 사례",
        url: "https://www.naran.co.kr/kwa-com_bos_succession_case_v-96?PB_1701155630=1&pc=p",
      },
    ],
    cautions: [
      "공개 사례는 참고자료이며 동일 결과를 보장하지 않음",
      "피해 회복 가능성은 개별 사안별 차이 큼",
    ],
    website: "https://www.naran.co.kr/",
    tags: ["민사", "손해배상", "피해자"],
  },
  {
    id: "lawoffice-rojin",
    displayOrder: 10,
    name: "법률사무소 로진",
    organizationType: "법률사무소",
    region: "서울",
    verifiedAt: "2026-04-03",
    specialties: ["형사(보이스피싱)"],
    summary:
      "공식 사이트에서 보이스피싱 전담팀 관련 성공사례가 확인되며, 담당 변호사, 사건 개요, 결과, 상담 전화, 주소 등이 비교적 상세히 공개되어 있다.",
    highlights: [
      "보이스피싱 성공사례 공개 확인",
      "보이스피싱 전담팀 표현 확인",
      "담당 변호사 3인, 결과 집행유예 공개",
      "서울 서초구 서초중앙로 164, 상담전화 1644-4658 공개",
    ],
    sources: [
      {
        label: "성공사례",
        url: "https://lawtruth.co.kr/bbs/board.php?bo_table=success&wr_id=254",
      },
      {
        label: "관련 소개 페이지 참고",
        url: "https://www.lawtalk.co.kr/posts/48807",
      },
    ],
    cautions: [
      "법무법인이 아니라 법률사무소 표기를 유지",
      "공개 사례는 참고용이며 결과 보장 아님",
    ],
    phone: "1644-4658",
    website: "https://lawtruth.co.kr/",
    tags: ["보이스피싱", "법률사무소", "사례"],
  },
];

const parsed = raw.map((x) => LawFirmEntrySchema.parse(x));

export const lawFirms: LawFirmEntry[] = [...parsed].sort(
  (a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
);
