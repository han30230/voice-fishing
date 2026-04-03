import type { LearningArticle } from "@/schemas/domain";

export const learningArticles: LearningArticle[] = [
  {
    slug: "psychology-pressure",
    title: "사기꾼이 심리를 흔드는 7가지 방식",
    summary: "긴급·비밀·권위·공포·죄책감… 패턴을 알면 대응이 쉬워집니다.",
    body: [
      "긴급성: ‘지금 당장’을 반복해 판단 시간을 빼앗습니다.",
      "비밀 유지: 가족·은행에 말하지 말라고 합니다.",
      "권위: 검찰/은행/공공기관을 사칭합니다.",
      "기술 혼란: 앱/원격/보안 용어로 우위를 만듭니다.",
      "작은 순응: 먼저 작은 행동을 시키고 점점 큰 행동으로 유도합니다.",
      "손실 회피: ‘안 하면 계좌 동결’ 같은 공포를 줍니다.",
      "친절/공감: 노인 대상에서 특히 강하게 나타납니다.",
    ],
    seoTitle: "보이스피싱 심리 기법 해설 | 안심콜",
    seoDescription: "전형적인 심리 압박 패턴과 안전한 대응.",
    updatedAt: "2026-04-02",
  },
  {
    slug: "official-will-never",
    title: "공식 기관·은행이 전화로 ‘절대’ 하기 어려운 요구",
    summary: "이런 요구가 나오면 거의 항상 위험 신호로 보는 편이 안전합니다.",
    body: [
      "비밀번호/OTP/보안카드 정보를 전화로 요구",
      "원격제어 앱 설치 및 화면 공유 요구",
      "‘안전계좌’로 돈을 옮기라고 지시",
      "가족에게 말하지 말라고 강요",
      "문자 링크로 로그인하라고 유도",
    ],
    seoTitle: "공식기관은 이런 요구를 잘 하지 않습니다 | 안심콜",
    seoDescription: "전형적인 사기 신호를 한 번에 점검.",
    updatedAt: "2026-04-02",
  },
];

export const learningBySlug = new Map(learningArticles.map((a) => [a.slug, a]));
