import type { OfficialContactGroup } from "@/schemas/domain";

/**
 * 공식 연락처 — 운영 시 각 기관 공식 사이트에서 번호·절차를 재확인하세요.
 */
export const officialContactHub: {
  pageVerifiedAt: string;
  globalCaution: string;
  groups: OfficialContactGroup[];
} = {
  pageVerifiedAt: "2026-04-03",
  globalCaution:
    "이 목록은 편의를 위한 안내이며, 번호·절차는 기관 정책에 따라 바뀔 수 있습니다. 반드시 공식 사이트·공식 앱에서 최신 연락처를 확인하세요.",
  groups: [
    {
      id: "police-report",
      title: "경찰 / 신고",
      description: "범죄 신고·긴급 상황(생명·신체 위험 포함)",
      sourceNote: "대한민국 경찰청 공개 안내 기준(긴급 112).",
      entries: [
        {
          id: "police-112",
          category: "경찰",
          organization: "경찰청",
          label: "112 (경찰 긴급)",
          phone: "112",
          link: "https://www.police.go.kr",
          hours: "24시간",
          description: "긴급한 범죄·사고·위급 상황에 사용합니다. 보이스피싱 피해 신고도 지역 관할서로 이어질 수 있습니다.",
          verifiedAt: "2026-04-03",
          cautionNote: "통화 중 추가 송금·앱 설치를 요구받으면 끊고 112 또는 공식 창구로 확인하세요.",
        },
        {
          id: "police-cyber-ecrm",
          category: "경찰",
          organization: "경찰청(사이버범죄 신고)",
          label: "사이버범죄 신고(ECRM)",
          phone: undefined,
          link: "https://ecrm.police.go.kr/",
          hours: "기관 안내 따름",
          description:
            "경찰청 사이버범죄 신고·상담 포털(ECRM)입니다. 온라인 접수 후 관할 경찰서 안내는 화면 지시에 따르세요.",
          verifiedAt: "2026-04-03",
          cautionNote: "도메인은 police.go.kr 하위인지 직접 확인하고, 문자로 온 링크는 누르지 마세요.",
        },
      ],
    },
    {
      id: "finance-stop",
      title: "금융 / 지급정지 / 상담",
      description: "이상거래·지급정지·계좌 보호 문의(각 금융기관 공식 채널 우선)",
      sourceNote: "금융소비자 보호·분쟁조정은 금융감독원 공개 채널을 참고하세요.",
      entries: [
        {
          id: "fss-consumer-1332",
          category: "금융",
          organization: "금융감독원(금융소비자 상담)",
          label: "금융소비자 상담 전화(공개 채널)",
          phone: "1332",
          link: "https://www.fss.or.kr",
          hours: "기관 공지 따름(평일 등)",
          description:
            "금융상품·불법 금융행위 관련 소비자 상담 등에 활용됩니다. 개별 계좌 지급정지는 거래 은행·카드사 공식 번호가 우선입니다.",
          verifiedAt: "2026-04-03",
          cautionNote: "이 사이트는 금융기관을 대리하지 않습니다. 지급정지는 반드시 거래 기관에 직접 요청하세요.",
        },
        {
          id: "bank-generic",
          category: "금융",
          organization: "거래 은행·카드사",
          label: "고객센터(본인 거래 기관)",
          phone: undefined,
          link: undefined,
          hours: "기관별 상이",
          description:
            "지급정지·이상거래 확인은 본인 명의로 가입한 은행·카드사의 공식 앱, 카드 뒷면, 또는 통장·뱅킹 앱에 표시된 번호로만 연락하세요. 검색·지도에 뜨는 번호는 사용하지 마세요.",
          verifiedAt: "2026-04-03",
          cautionNote: "검색 결과 상위 광고 번호는 피싱일 수 있습니다.",
        },
      ],
    },
    {
      id: "kisa",
      title: "KISA·스미싱·유의 안내",
      description: "개인정보·스미싱 등 인터넷 침해 관련 상담·신고(기관 안내)",
      sourceNote: "한국인터넷진흥원(KISA) 공개 채널을 참고하세요.",
      entries: [
        {
          id: "kisa-118",
          category: "KISA",
          organization: "한국인터넷진흥원(KISA)",
          label: "KISA 상담(118)",
          phone: "118",
          link: "https://www.kisa.or.kr",
          hours: "기관 공지 따름",
          description:
            "스미싱·개인정보 유출 등 인터넷 침해 관련 상담·신고 안내는 KISA 공식 사이트 및 118 안내를 따르세요.",
          verifiedAt: "2026-04-03",
          cautionNote: "문자로 온 ‘KISA’ 사칭 링크는 누르지 말고, 직접 kisa.or.kr 도메인을 확인하세요.",
        },
      ],
    },
    {
      id: "telecom",
      title: "통신사",
      description: "스미싱·유심·명의 관련 상담(가입 통신사)",
      sourceNote: "본인이 이용 중인 통신사 공식 고객센터만 사용하세요.",
      entries: [
        {
          id: "telecom-skt",
          category: "통신",
          organization: "SK텔레콤",
          label: "SKT 고객센터(공식)",
          phone: undefined,
          link: "https://www.tworld.co.kr",
          hours: "기관 공지 따름",
          description:
            "명의·유심·스미싱 차단 등은 가입이 SK텔레콤일 때 공식 앱·홈페이지에 안내된 고객센터로만 문의하세요.",
          verifiedAt: "2026-04-03",
          cautionNote: "문자로 온 ‘고객센터’ 링크는 클릭하지 마세요.",
        },
        {
          id: "telecom-kt",
          category: "통신",
          organization: "KT",
          label: "KT 고객센터(공식)",
          phone: undefined,
          link: "https://www.kt.com",
          hours: "기관 공지 따름",
          description: "KT 가입자는 공식 사이트·앱에서 고객센터 번호를 확인한 뒤 연락하세요.",
          verifiedAt: "2026-04-03",
          cautionNote: "검색 광고 번호 대신 공식 채널만 이용하세요.",
        },
        {
          id: "telecom-lgu",
          category: "통신",
          organization: "LG유플러스",
          label: "LG U+ 고객센터(공식)",
          phone: undefined,
          link: "https://www.uplus.co.kr",
          hours: "기관 공지 따름",
          description: "LG U+ 가입자는 공식 사이트·앱에서 고객센터 번호를 확인한 뒤 연락하세요.",
          verifiedAt: "2026-04-03",
          cautionNote: "문자로 온 ‘인증’ 링크는 누르지 마세요.",
        },
      ],
    },
    {
      id: "card",
      title: "카드사",
      description: "카드 도용·결제 이상 징후",
      sourceNote: "보유 카드 뒷면·공식 앱의 고객센터를 사용하세요.",
      entries: [
        {
          id: "card-issuer-placeholder",
          category: "카드",
          organization: "발급 카드사",
          label: "카드 고객센터(본인 카드사)",
          phone: undefined,
          link: undefined,
          hours: "기관별 상이",
          description:
            "결제 정지·재발급·도용 의심은 카드 뒷면·공식 앱에 표시된 본인 카드사 번호로만 진행하세요.",
          verifiedAt: "2026-04-03",
          cautionNote: "카드 정보·OTP는 전화로 말하지 마세요.",
        },
      ],
    },
    {
      id: "legal-aid",
      title: "법률 공공지원",
      description: "공익법률지원·상담(자격·절차는 기관 안내)",
      sourceNote: "대한민국 법률구조공단 등 공공지원 제도를 참고하세요.",
      entries: [
        {
          id: "klac-main",
          category: "법률",
          organization: "대한법률구조공단",
          label: "법률구조공단 통합상담(공개 채널)",
          phone: "132",
          link: "https://www.klac.or.kr",
          hours: "평일 등(공단 공지·지역센터 안내 따름)",
          description:
            "무료 법률상담·법률구조 신청 등은 공단 공식 사이트와 통합상담(국번 없이 132) 안내를 따르세요. 운영 시간·자격은 공단 공지를 확인하세요.",
          verifiedAt: "2026-04-03",
          cautionNote: "개별 승인 여부는 심사 절차에 따릅니다. 번호·시간은 공단 공지 변경될 수 있습니다.",
        },
      ],
    },
  ],
};
