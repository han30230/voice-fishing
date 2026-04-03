import type { OfficialHelpResource } from "@/schemas/domain";

export const helpResources: OfficialHelpResource[] = [
  {
    id: "emergency-report",
    name: "긴급 신고(공식 채널)",
    purpose: "범죄 신고 및 긴급 대응 연결",
    whenToUse: "금전 피해가 발생했거나, 즉시 위험이 감지될 때",
    prepareBeforeContact: [
      "발생 일시",
      "상대 전화번호/계좌(알고 있는 범위)",
      "송금/이체 내역 캡처",
      "문자/대화 원문",
    ],
    operatingNotes:
      "실제 운영 시에는 검증된 공식 번호/절차를 운영자가 입력하세요. 이 MVP는 구조와 준비물 중심입니다.",
    disclaimer:
      "이 페이지는 공식기관 안내를 대체하지 않습니다. 정확한 연락처는 항상 공식 사이트에서 확인하세요.",
    phonePlaceholder: "[운영자 입력: 공식 긴급 신고 번호]",
  },
  {
    id: "smishing-consult",
    name: "스미싱/보안 상담(통신/보안)",
    purpose: "스미싱 URL, 악성앱 설치 의심 상담",
    whenToUse: "문자 링크를 눌렀거나 설치가 의심될 때",
    prepareBeforeContact: ["문자 원문 캡처", "URL 전체", "설치 앱 이름(있으면)"],
    operatingNotes: "통신사/보안 포털의 공식 상담 채널을 연결하도록 구성하세요.",
    disclaimer: "민감정보는 불필요한 범위에서 최소한만 제공하세요.",
    phonePlaceholder: "[운영자 입력]",
  },
  {
    id: "spam-report",
    name: "스팸/스미싱 신고",
    purpose: "불법 스팸 문자 신고 및 차단 지원",
    whenToUse: "반복 스팸, 피싱 문자가 지속될 때",
    prepareBeforeContact: ["발신번호", "수신시간", "문자 내용"],
    operatingNotes: "운영 정책에 맞는 공식 신고 앱/웹을 연결하세요.",
    disclaimer: "신고가 곧바로 피해 구제로 이어지지 않을 수 있습니다.",
  },
  {
    id: "bank-prep",
    name: "금융기관 문의 전 체크리스트",
    purpose: "상담 시간을 아끼고 정확한 조치를 받기 위함",
    whenToUse: "은행/카드사에 전화하기 직전",
    prepareBeforeContact: [
      "본인 확인 정보(공식 절차 안내에 따름)",
      "최근 거래 3건",
      "의심 거래 시각",
      "피싱 문자/링크(있으면)",
    ],
    operatingNotes: "고객센터는 본인확인 질문을 할 수 있습니다. 정상 절차입니다.",
    disclaimer: "이 사이트는 금융기관을 대리하지 않습니다.",
  },
  {
    id: "legal-prep",
    name: "법률 상담 전 준비물(일반)",
    purpose: "상담 품질을 높이기 위한 사실관계 정리",
    whenToUse: "피해가 크거나 분쟁이 예상될 때",
    prepareBeforeContact: ["타임라인", "증거 파일", "상대 정보(알고 있는 범위)", "이미 한 조치"],
    operatingNotes: "변호사 선택은 본인 판단이며, 이 사이트는 특정 법률사무소를 추천하지 않습니다.",
    disclaimer: "법률 자문은 개별 사건에 따라 달라질 수 있습니다.",
  },
];
