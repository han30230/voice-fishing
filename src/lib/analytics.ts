/**
 * Analytics plan (MVP): event names + when to fire.
 *
 * Replace `window.dispatchEvent` with your analytics SDK (GA4, PostHog, etc).
 *
 * Events:
 * - home.emergency_tile_click { tileId, href }
 * - self_check.start {}
 * - self_check.complete { riskScore, riskCategory, primaryType }
 * - scenario.view { slug }
 * - evidence.start {}
 * - evidence.export { format: "print" | "copy" }
 * - family.mode_toggle { elderLargeText: boolean, simpleUi: boolean }
 * - help.resource_click { resourceId }
 * - search.query { q }
 * - alert.open { slug }
 * - faq.expand { id }
 */
export function trackEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("ansymcall:analytics", {
      detail: { name, payload, ts: Date.now() },
    }),
  );
}
