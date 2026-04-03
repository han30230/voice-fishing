import { SeoIntentPageSchema, type SeoIntentPage } from "@/schemas/domain";

const raw: unknown[] = [
  {
    slug: "voice-phishing-money-sent",
    title: "보이스피싱으로 돈 보냈을 때 해야 할 일",
    seoTitle: "보이스피싱 송금 후 대응 | VoiceGuard",
    seoDescription: "송금 직후 멈춤, 지급정지·신고·증거 정리 순서를 행동 중심으로 안내합니다.",
    h1: "보이스피싱으로 돈을 보냈을 때",
    lead: "먼저 ‘추가 송금’을 멈추고, 거래 기관과 공식 신고 절차를 확인하세요. 결과는 사건마다 다릅니다.",
    sections: [
      {
        heading: "지금 바로",
        body: [
          "통화·화면공유·원격이 이어지면 즉시 끊습니다.",
          "본인 거래 은행·카드사 공식 앱·공식 번호로 이상거래·지급정지 가능 여부를 문의합니다(검색 광고 번호 주의).",
          "문자·계좌·통화기록을 캡처해 두었다가 /evidence 에 옮겨 적습니다.",
        ],
      },
      {
        heading: "이어서",
        body: [
          "경찰 신고 등 공식 절차는 관할 안내에 따릅니다.",
          "환급·추적은 기관 판단과 절차에 따르며, 이 사이트는 결과를 보장하지 않습니다.",
        ],
      },
    ],
    faq: [
      {
        id: "f1",
        question: "환급이 바로 되나요?",
        answer:
          "지급정지 성공 여부·수사 진행 등에 따라 다릅니다. 공식기관 답변을 기준으로 하세요.",
      },
    ],
    relatedSlugs: ["smishing-link-clicked", "refund-after-report"],
    verifiedAt: "2026-04-03",
  },
  {
    slug: "smishing-link-clicked",
    title: "문자 링크를 눌렀을 때 대처법",
    seoTitle: "스미싱 링크 클릭 후 대응 | VoiceGuard",
    seoDescription: "연결 차단, 앱·권한 점검, 금융 이상거래 확인까지 순서대로 안내합니다.",
    h1: "문자 링크를 눌렀을 때",
    lead: "로그인·설치까지 갔다면 추가 피해를 막는 것이 우선입니다.",
    sections: [
      {
        heading: "즉시",
        body: [
          "낯선 앱이 설치되어 있으면 권한을 해제하고 삭제를 시도합니다.",
          "금융 앱 비밀번호·다른 기기에서의 세션 종료를 검토합니다.",
        ],
      },
      {
        heading: "확인",
        body: [
          "최근 결제·이체 알림을 확인합니다.",
          "필요하면 통신·보안 관련 공식 상담 채널을 검토합니다(공식 도메인만).",
        ],
      },
    ],
    faq: [],
    relatedSlugs: ["smishing-link-aftermath", "remote-app-installed"],
    verifiedAt: "2026-04-03",
  },
  {
    slug: "prosecutor-impersonation-call",
    title: "검찰 사칭 전화 대처법",
    seoTitle: "검찰 사칭 전화 대응 | VoiceGuard",
    seoDescription: "통화 중단·공식 확인·증거 보존 중심의 실무 순서입니다.",
    h1: "검찰을 사칭한 전화가 왔을 때",
    lead: "수사기관은 통화만으로 계좌 이체·민감정보·원격제어를 요구하지 않는 경우가 일반적입니다.",
    sections: [
      {
        heading: "먼저",
        body: ["통화를 끊습니다.", "상대가 준 번호가 아니라 본인이 찾은 공식 번호로 확인합니다."],
      },
      {
        heading: "그다음",
        body: ["문자·송금 요구·앱 설치 요구는 고위험 신호로 남깁니다.", "/evidence 로 기록을 정리합니다."],
      },
    ],
    faq: [],
    relatedSlugs: ["voice-phishing-money-sent", "phone-subscription-check"],
    verifiedAt: "2026-04-03",
  },
  {
    slug: "remote-app-installed",
    title: "원격제어 앱을 설치했을 때",
    seoTitle: "원격제어·악성앱 설치 후 대응 | VoiceGuard",
    seoDescription: "연결 끊기, 권한 해제, 다른 기기에서 계정 보호까지 체크리스트로 안내합니다.",
    h1: "원격제어 앱을 설치했을 때",
    lead: "기기가 완전히 안전하다고 단정할 수는 없지만, 피해 확대를 늦출 수 있습니다.",
    sections: [
      {
        heading: "우선",
        body: ["/emergency/app-installed 의 체크리스트를 따르는 것을 권합니다."],
      },
    ],
    faq: [],
    relatedSlugs: ["smishing-link-clicked", "voice-phishing-money-sent"],
    verifiedAt: "2026-04-03",
  },
  {
    slug: "parent-voice-phishing",
    title: "부모님 보이스피싱 대응법",
    seoTitle: "부모님 보이스피싱 가족 대응 | VoiceGuard",
    seoDescription: "비난보다 멈춤·확인·함께 가기. 가족 모드와 증거 정리로 연결합니다.",
    h1: "부모님이 보이스피싱에 당한 것 같을 때",
    lead: "감정이 올라가면 실수가 커질 수 있습니다. ‘멈추고·확인하고·함께’가 순서입니다.",
    sections: [
      {
        heading: "가족이 할 일",
        body: [
          "추가 송금·앱 설치를 당장 멈추게 합니다.",
          "은행·카드는 공식 앱·공식 번호로만 확인합니다.",
          "/family 모드로 큰 글씨 안내를 켤 수 있습니다.",
        ],
      },
    ],
    faq: [],
    relatedSlugs: ["phone-subscription-check", "voice-phishing-money-sent"],
    verifiedAt: "2026-04-03",
  },
  {
    slug: "phone-subscription-check",
    title: "내 명의 휴대폰 개통 확인 방법",
    seoTitle: "명의 휴대폰 개통 확인 | VoiceGuard",
    seoDescription: "가입 통신사·공식 절차를 기준으로 확인하는 방법을 안내합니다.",
    h1: "내 명의로 휴대폰이 개통됐는지 확인하려면",
    lead: "통신사·공인된 절차가 가장 정확합니다. 문자 링크는 피하세요.",
    sections: [
      {
        heading: "절차",
        body: [
          "본인 명의로 가입한 통신사 공식 앱·고객센터에서 조회합니다.",
          "명의 도용 의심이 있으면 /identity 와 한국인터넷진흥원 공식 안내를 참고합니다.",
        ],
      },
    ],
    faq: [],
    relatedSlugs: ["smishing-link-aftermath", "remote-app-installed"],
    verifiedAt: "2026-04-03",
  },
  {
    slug: "refund-after-report",
    title: "보이스피싱 신고 후 환급 절차",
    seoTitle: "보이스피싱 신고 후 환급(참고) | VoiceGuard",
    seoDescription: "환급·지급정지는 절차와 사건에 따라 다릅니다. 공식 답변을 기준으로 하세요.",
    h1: "신고한 뒤 환급은 어떻게 되나요",
    lead: "환급 여부와 시기는 보장할 수 없습니다. 수사·금융기관의 공식 안내를 따르세요.",
    sections: [
      {
        heading: "이해하기",
        body: [
          "지급정지 성공 여부와 환급은 별개일 수 있습니다.",
          "추가 서류 요청이 있을 수 있습니다.",
        ],
      },
    ],
    faq: [
      {
        id: "f1",
        question: "100% 돌려받을 수 있나요?",
        answer: "그렇게 단정할 수 없습니다. 절차와 증거·수사 상황에 따라 달라집니다.",
      },
    ],
    relatedSlugs: ["voice-phishing-money-sent", "smishing-link-clicked"],
    verifiedAt: "2026-04-03",
  },
  {
    slug: "smishing-link-aftermath",
    title: "스미싱 링크 눌렀는데 괜찮은지 확인하는 방법",
    seoTitle: "스미싱 링크 이후 점검 | VoiceGuard",
    seoDescription: "‘완전 안전’을 단정하지 않고, 확인 순서와 위험 신호를 안내합니다.",
    h1: "스미싱 링크를 눌렀는데 괜찮은지 모르겠어요",
    lead: "원격 없이 링크만 연 경우와 로그인·설치까지 간 경우 위험이 다릅니다. ‘아무 일 없음’을 보장할 수는 없습니다.",
    sections: [
      {
        heading: "확인 순서",
        body: [
          "무엇을 입력·설치했는지 먼저 구분합니다.",
          "금융 이상거래·문자를 확인합니다.",
          "의심이 크면 /check 와 /tools/script-detector 를 병행해 참고합니다.",
        ],
      },
    ],
    faq: [],
    relatedSlugs: ["smishing-link-clicked", "remote-app-installed"],
    verifiedAt: "2026-04-03",
  },
];

export const seoIntentPages: SeoIntentPage[] = raw.map((x) => SeoIntentPageSchema.parse(x));

export const seoIntentBySlug = new Map(seoIntentPages.map((p) => [p.slug, p]));
