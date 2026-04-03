import { z } from "zod";

export const RiskLevelSchema = z.enum(["low", "medium", "high", "critical"]);
export type RiskLevel = z.infer<typeof RiskLevelSchema>;

export const RiskCategorySchema = z.enum([
  "low_concern",
  "suspicious",
  "high_risk",
  "immediate_action_required",
  "likely_active_scam",
]);
export type RiskCategory = z.infer<typeof RiskCategorySchema>;

export const FAQItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});
export type FAQItem = z.infer<typeof FAQItemSchema>;

export const DialogueLineSchema = z.object({
  speaker: z.string(),
  line: z.string(),
});
export type DialogueLine = z.infer<typeof DialogueLineSchema>;

export const ScamScenarioSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  shortSummary: z.string(),
  riskLevel: RiskLevelSchema,
  impersonatedEntity: z.string().optional(),
  commonScripts: z.array(z.string()).default([]),
  /** 대화 예시(시나리오) — 범인이 흔히 쓰는 말투 */
  dialogueExamples: z.array(DialogueLineSchema).default([]),
  /** 왜 속기 쉬운지 */
  whyBelievable: z.string().optional(),
  /** 진짜 기관이면 보통 다른 점 */
  authenticDifference: z.string().optional(),
  commonChannels: z.array(z.string()).default([]),
  commonPsychology: z.array(z.string()).default([]),
  dangerSigns: z.array(z.string()).default([]),
  immediateActions: z.array(z.string()).default([]),
  whatNotToDo: z.array(z.string()).default([]),
  evidenceChecklist: z.array(z.string()).default([]),
  faq: z.array(FAQItemSchema).default([]),
  relatedScams: z.array(z.string()).default([]),
  seoTitle: z.string(),
  seoDescription: z.string(),
  updatedAt: z.string(),
});
export type ScamScenario = z.infer<typeof ScamScenarioSchema>;

export const RecoveryPhaseSchema = z.object({
  title: z.string(),
  bullets: z.array(z.string()),
});
export type RecoveryPhase = z.infer<typeof RecoveryPhaseSchema>;

export const RecoveryGuideSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  first10Minutes: z.array(z.string()),
  firstHour: z.array(z.string()),
  today: z.array(z.string()),
  next7Days: z.array(z.string()),
  monitorAfter: z.array(z.string()),
  checklist: z.array(z.string()),
  emotionalNote: z.string(),
});
export type RecoveryGuide = z.infer<typeof RecoveryGuideSchema>;

export const AlertPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  publishedAt: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
});
export type AlertPost = z.infer<typeof AlertPostSchema>;

export const LearningArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  body: z.array(z.string()).default([]),
  seoTitle: z.string(),
  seoDescription: z.string(),
  updatedAt: z.string(),
});
export type LearningArticle = z.infer<typeof LearningArticleSchema>;

export const OfficialHelpResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  purpose: z.string(),
  whenToUse: z.string(),
  prepareBeforeContact: z.array(z.string()).default([]),
  operatingNotes: z.string(),
  disclaimer: z.string(),
  phonePlaceholder: z.string().optional(),
  urlPlaceholder: z.string().optional(),
});
export type OfficialHelpResource = z.infer<typeof OfficialHelpResourceSchema>;

export const TimelineEntrySchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  type: z.enum(["call", "sms", "app", "transfer", "other"]),
  actor: z.string().optional(),
  description: z.string(),
  evidenceAttached: z.boolean().default(false),
});
export type TimelineEntry = z.infer<typeof TimelineEntrySchema>;

export const BankTransferSchema = z.object({
  id: z.string(),
  bankName: z.string().optional(),
  accountNumberMasked: z.string().optional(),
  recipientName: z.string().optional(),
  amount: z.string().optional(),
  timestamp: z.string().optional(),
  notes: z.string().optional(),
});
export type BankTransfer = z.infer<typeof BankTransferSchema>;

export const EvidenceDraftSchema = z.object({
  incidentTitle: z.string().default(""),
  /** 사건 발생(추정) 시각 — 요약·시간순 정리에 사용 */
  incidentOccurredAt: z.string().default(""),
  /** 상대가 주장한 기관/단체명 */
  claimedOrganization: z.string().default(""),
  createdAt: z.string(),
  updatedAt: z.string(),
  victimType: z.enum(["self", "parent", "other"]).default("self"),
  contactPhoneNumbers: z.array(z.string()).default([]),
  suspiciousLinks: z.array(z.string()).default([]),
  suspiciousMessages: z.array(z.string()).default([]),
  bankTransfers: z.array(BankTransferSchema).default([]),
  installedApps: z.array(z.string()).default([]),
  timelineEntries: z.array(TimelineEntrySchema).default([]),
  notes: z.string().default(""),
  policeReported: z.boolean().default(false),
  bankReported: z.boolean().default(false),
  hasCallRecording: z.boolean().default(false),
  hasMessageCapture: z.boolean().default(false),
  hasScreenCapture: z.boolean().default(false),
  exportedSummary: z.string().optional(),
});
export type EvidenceDraft = z.infer<typeof EvidenceDraftSchema>;

export const OfficialContactEntrySchema = z.object({
  id: z.string(),
  category: z.string(),
  organization: z.string(),
  label: z.string(),
  /** 국번만·하이픈 없이도 가능. 미검증이면 비우고 link 안내 */
  phone: z.string().optional(),
  link: z.string().optional(),
  hours: z.string().optional(),
  description: z.string(),
  verifiedAt: z.string(),
  cautionNote: z.string().optional(),
});
export type OfficialContactEntry = z.infer<typeof OfficialContactEntrySchema>;

export const OfficialContactGroupSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  sourceNote: z.string().optional(),
  entries: z.array(OfficialContactEntrySchema),
});
export type OfficialContactGroup = z.infer<typeof OfficialContactGroupSchema>;

export const SuspiciousTextRuleSchema = z.object({
  id: z.string(),
  label: z.string(),
  /** 정규식 소스 문자열 — 클라이언트에서 RegExp로 컴파일 */
  patternSources: z.array(z.string()),
  advice: z.string(),
  /** 왜 의심되는지 한 줄 */
  why: z.string().optional(),
});
export type SuspiciousTextRule = z.infer<typeof SuspiciousTextRuleSchema>;

export const SeoIntentPageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  h1: z.string(),
  lead: z.string(),
  sections: z.array(
    z.object({
      heading: z.string(),
      body: z.array(z.string()),
    }),
  ),
  faq: z.array(FAQItemSchema).default([]),
  relatedSlugs: z.array(z.string()).default([]),
  verifiedAt: z.string(),
});
export type SeoIntentPage = z.infer<typeof SeoIntentPageSchema>;

export const IdentityProtectionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  whyNow: z.string(),
  whatYouNeed: z.string(),
  whereToGo: z.string(),
  outboundUrl: z.string(),
  outboundLabel: z.string(),
  verifiedAt: z.string(),
  caution: z.string().optional(),
});
export type IdentityProtectionItem = z.infer<typeof IdentityProtectionItemSchema>;

export const SelfCheckQuestionSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  helpText: z.string().optional(),
  options: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        score: z.number().int(),
        flags: z.array(z.string()).default([]),
      }),
    )
    .min(2),
});
export type SelfCheckQuestion = z.infer<typeof SelfCheckQuestionSchema>;

export const SelfCheckResultSchema = z.object({
  riskScore: z.number().int().min(0).max(100),
  riskCategory: RiskCategorySchema,
  primarySuspectedType: z.string(),
  explanation: z.string(),
  immediateActionPlan: z.array(z.string()),
  officialHelpRecommendation: z.array(z.string()),
  evidenceChecklist: z.array(z.string()),
  triggeredFlags: z.array(z.string()),
});
export type SelfCheckResult = z.infer<typeof SelfCheckResultSchema>;

export const FamilyResourceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  content: z.array(z.string()),
});
export type FamilyResource = z.infer<typeof FamilyResourceSchema>;
