/**
 * Analytics plan (MVP): event names + when to fire.
 *
 * Replace `window.dispatchEvent` with your analytics SDK (GA4, PostHog, etc).
 *
 * Events:
 * - home.emergency_tile_click { tileId, href }
 * - home.emergency_strip_click { actionId, href }
 * - self_check.start {}
 * - self_check.complete { riskScore, riskCategory, primaryType }
 * - scenario.view { slug }
 * - evidence.start {}
 * - evidence.export { format: "print" | "copy" | "timeline_copy" }
 * - evidence.clear {}
 * - family.mode_toggle { elderLargeText: boolean, simpleUi: boolean }
 * - family.mode_enter { path } (optional)
 * - help.resource_click { resourceId }
 * - help.phone_copy { label }
 * - help.outbound_click { href }
 * - search.query { q }
 * - alert.open { slug }
 * - faq.expand { id }
 * - suspicious_text.analyze { length, hitCount }
 * - suspicious_text.clear {}
 * - script_detector.clear {} (legacy)
 */
export function trackEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("ansymcall:analytics", {
      detail: { name, payload, ts: Date.now() },
    }),
  );
}
