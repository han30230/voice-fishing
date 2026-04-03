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

export const ScamScenarioSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  shortSummary: z.string(),
  riskLevel: RiskLevelSchema,
  impersonatedEntity: z.string().optional(),
  commonScripts: z.array(z.string()).default([]),
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
  exportedSummary: z.string().optional(),
});
export type EvidenceDraft = z.infer<typeof EvidenceDraftSchema>;

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
