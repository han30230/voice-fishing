import { useCallback, useSyncExternalStore } from "react";

import { EvidenceDraftSchema, type EvidenceDraft } from "@/schemas/domain";
import { clearDraft, emptyDraft, loadDraft, nowIso, saveDraft } from "@/lib/evidence/storage";

const EVENT = "ansymcall:evidenceDraftUpdated";

/**
 * 서버·클라이언트 첫 페인트용 고정 스냅샷(참조 동일) — hydration 일치 + useSyncExternalStore 무한 루프 방지.
 * getSnapshot이 매번 새 객체를 반환하면 React가 스토어가 끊임없이 바뀐다고 보아 크래시/탭 종료가 날 수 있음(모바일 Safari 등).
 */
const SERVER_SNAPSHOT: EvidenceDraft = emptyDraft();

let clientSnapshot: EvidenceDraft = SERVER_SNAPSHOT;

function emit() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // ignore
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const syncFromStorage = () => {
    try {
      clientSnapshot = loadDraft();
    } catch {
      clientSnapshot = emptyDraft();
    }
    onStoreChange();
  };

  try {
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(EVENT, syncFromStorage);
    syncFromStorage();
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener(EVENT, syncFromStorage);
    };
  } catch {
    return () => {};
  }
}

function getSnapshot(): EvidenceDraft {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  return clientSnapshot;
}

function getServerSnapshot(): EvidenceDraft {
  return SERVER_SNAPSHOT;
}

export function useEvidenceDraft() {
  const draft = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setDraft = useCallback((updater: EvidenceDraft | ((prev: EvidenceDraft) => EvidenceDraft)) => {
    if (typeof window === "undefined") return;

    const prev = clientSnapshot;
    const next = typeof updater === "function" ? updater(prev) : updater;
    const parsed = EvidenceDraftSchema.safeParse({ ...next, updatedAt: nowIso() });
    if (!parsed.success) return;

    clientSnapshot = parsed.data;
    try {
      saveDraft(clientSnapshot);
    } catch {
      // 사파리 비공개 모드·용량 등: 메모리 상태만 유지
    }
    emit();
  }, []);

  const reset = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      clearDraft();
    } catch {
      // ignore
    }
    clientSnapshot = emptyDraft();
    emit();
  }, []);

  return { draft, setDraft, reset };
}
