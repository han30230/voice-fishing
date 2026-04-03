import { useCallback, useSyncExternalStore } from "react";

import { EvidenceDraftSchema, type EvidenceDraft } from "@/schemas/domain";
import { clearDraft, emptyDraft, loadDraft, nowIso, saveDraft } from "@/lib/evidence/storage";

const EVENT = "ansymcall:evidenceDraftUpdated";

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onStoreChange: () => void) {
  try {
    window.addEventListener("storage", onStoreChange);
    window.addEventListener(EVENT, onStoreChange);
    return () => {
      window.removeEventListener("storage", onStoreChange);
      window.removeEventListener(EVENT, onStoreChange);
    };
  } catch {
    return () => {};
  }
}

function getSnapshot(): EvidenceDraft {
  try {
    return loadDraft();
  } catch {
    return emptyDraft();
  }
}

function getServerSnapshot(): EvidenceDraft {
  return emptyDraft();
}

export function useEvidenceDraft() {
  const draft = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setDraft = useCallback((updater: EvidenceDraft | ((prev: EvidenceDraft) => EvidenceDraft)) => {
    const prev = EvidenceDraftSchema.parse(getSnapshot());
    const next = typeof updater === "function" ? updater(prev) : updater;
    const normalized = EvidenceDraftSchema.parse({ ...next, updatedAt: nowIso() });
    saveDraft(normalized);
    emit();
  }, []);

  const reset = useCallback(() => {
    clearDraft();
    emit();
  }, []);

  return { draft, setDraft, reset };
}
