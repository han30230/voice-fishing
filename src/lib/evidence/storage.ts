import { EvidenceDraftSchema, type EvidenceDraft } from "@/schemas/domain";

const KEY = "ansymcall.evidenceDraft.v1";

export function nowIso() {
  return new Date().toISOString();
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function emptyDraft(): EvidenceDraft {
  const t = nowIso();
  return EvidenceDraftSchema.parse({
    incidentTitle: "",
    incidentOccurredAt: "",
    claimedOrganization: "",
    createdAt: t,
    updatedAt: t,
    victimType: "self",
    contactPhoneNumbers: [],
    suspiciousLinks: [],
    suspiciousMessages: [],
    bankTransfers: [],
    installedApps: [],
    timelineEntries: [],
    notes: "",
    policeReported: false,
    bankReported: false,
    hasCallRecording: false,
    hasMessageCapture: false,
    hasScreenCapture: false,
  });
}

export function loadDraft(): EvidenceDraft {
  if (typeof window === "undefined") return emptyDraft();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyDraft();
    const parsed = JSON.parse(raw) as unknown;
    const migrated = migrateDraft(parsed);
    return EvidenceDraftSchema.parse(migrated);
  } catch {
    return emptyDraft();
  }
}

export function saveDraft(draft: EvidenceDraft) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(draft));
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

function migrateDraft(parsed: unknown): unknown {
  if (!parsed || typeof parsed !== "object") return parsed;
  const d = parsed as Record<string, unknown>;

  const timelineEntries = Array.isArray(d.timelineEntries)
    ? d.timelineEntries.map((e) => {
        if (!e || typeof e !== "object") return e;
        const x = e as Record<string, unknown>;
        return typeof x.id === "string" && x.id.length > 0 ? x : { ...x, id: newId() };
      })
    : d.timelineEntries;

  const bankTransfers = Array.isArray(d.bankTransfers)
    ? d.bankTransfers.map((t) => {
        if (!t || typeof t !== "object") return t;
        const x = t as Record<string, unknown>;
        return typeof x.id === "string" && x.id.length > 0 ? x : { ...x, id: newId() };
      })
    : d.bankTransfers;

  return { ...d, timelineEntries, bankTransfers };
}
