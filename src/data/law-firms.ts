import { LawFirmEntrySchema, type LawFirmEntry } from "@/schemas/domain";

/**
 * 법률 도움 디렉터리(운영자 입력)
 *
 * 원칙:
 * - 이 서비스가 임의로 "추천/순위/별점/후기"를 생성하지 않습니다.
 * - 별점/후기/평판을 적을 경우 반드시 sources에 출처 URL을 함께 넣으세요.
 * - 대표번호는 공식 사이트에서 확인했을 때만 입력하세요.
 */

const raw: unknown[] = [
  {
    id: "placeholder-1",
    name: "[운영자 입력] 보이스피싱 사건 경험이 있는 법률사무소/법무법인",
    region: "전국/지역",
    specialties: ["형사(사기/보이스피싱)", "민사(손해배상)"],
    phone: undefined,
    website: undefined,
    registryUrl: "https://www.koreanbar.or.kr",
    operatorSummary:
      "이 항목은 샘플입니다. 실제 운영 시에는 ‘사실 정보 + 출처’만 입력하세요(과장/보장 문구 금지).",
    reputationSummary: undefined,
    ratingNote: undefined,
    sources: [
      {
        label: "대한변호사협회(변호사·사무실 정보 확인)",
        url: "https://www.koreanbar.or.kr",
      },
    ],
    verifiedAt: "2026-04-03",
    cautionNote:
      "‘환급 보장’ ‘수사기관 연결’ 등 과장/보장 문구는 의심하세요. 계약·비용은 서면으로 확인하세요.",
  },
];

export const lawFirms: LawFirmEntry[] = raw.map((x) => LawFirmEntrySchema.parse(x));

